import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import StackTrace from 'stacktrace-js'

import { createPrefilledIssue } from '../../util/github-service'
import ActionCard from '../Shared/ActionCard'

type CatalogError = { error: Error; trace: StackTrace.StackFrame[] }

export interface ErrorFallbackPRops {
    error: CatalogError | null
    handleSubmit: () => void
}

interface Props {
    children: React.ReactNode
    componentName?: string
    onRenderFallback?: (props: ErrorFallbackPRops) => React.ReactElement
}

const CatalogErrorBoundary = ({ onRenderFallback, children, componentName }: Props) => {
    const [error, setError] = useState<CatalogError | null>(null)

    const handleSubmit = () => {
        if (!error) return

        window.open(
            createPrefilledIssue({
                title: `Problem: Fehler in der ${
                    componentName ? 'Komponente ' + componentName : 'Anwendung'
                }, Version: ${__VERSION__}`,
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
            <Alert color="error" action={<Button onClick={handleSubmit}>melden</Button>}>
                <AlertTitle>Fehler</AlertTitle>
                Teile des Katalogs funktionieren nicht ordnungsgemäß
            </Alert>
        </ActionCard>
    )

    return (
        <ErrorBoundary
            fallback={onRenderFallback ? onRenderFallback({ error, handleSubmit }) : fallback}
            onError={handleError}>
            {children}
        </ErrorBoundary>
    )
}

export default CatalogErrorBoundary
