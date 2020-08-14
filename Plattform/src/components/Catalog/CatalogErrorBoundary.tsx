import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import StackTrace from 'stacktrace-js'

import { createPrefilledIssue } from '../../util/github-service'
import ActionCard from '../Shared/ActionCard'

interface Props {
    children: React.ReactNode
    componentName: string
}

const CatalogErrorBoundary = ({ children, componentName }: Props) => {
    const [error, setError] = useState<{ error: Error; trace: StackTrace.StackFrame[] } | null>(
        null
    )

    const handleSubmitClick = () => {
        window.open(
            createPrefilledIssue({
                title: `Problem: Fehler in der Komponente ${componentName}, Version: ${__VERSION__}`,
                body: `error: ${error.error} \n\ntrace: ${error.trace}`,
                template: 'general_bug_template.md',
                labels: ['bug'],
            })
        )
    }

    const handleError = async (error: Error) => {
        const trace = await StackTrace.fromError(error)
        setError({ error, trace })
    }

    const fallback = (
        <ActionCard disableActionArea>
            <Alert
                color="error"
                action={
                    <Button disabled={!error} onClick={handleSubmitClick}>
                        melden
                    </Button>
                }>
                <AlertTitle>Fehler</AlertTitle>
                Teile des Katalogs funktionieren nicht ordnungsgemäß
            </Alert>
        </ActionCard>
    )

    return (
        <ErrorBoundary fallback={fallback} onError={handleError}>
            {children}
        </ErrorBoundary>
    )
}

export default CatalogErrorBoundary
