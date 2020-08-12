import { makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import StackBlitzSDK from '@stackblitz/sdk'
import { EmbedOptions } from '@stackblitz/sdk/typings/interfaces'
import { VM } from '@stackblitz/sdk/typings/VM'
import React, { useEffect, useState } from 'react'

import LectureSandbox from '../Shared/LectureSandbox'

const options: EmbedOptions = {
    width: '100%',
    height: '100%',
    hideDevTools: true,
    hideExplorer: true,
    hideNavigation: true,
    theme: 'light',
}

const useStyles = makeStyles(() => ({
    stackblitzContainer: {
        width: '100%',
        height: '100%',
    },
}))

const StackblitzContainer = ({ path }: Pick<Props, 'path'>) => {
    const [error, setError] = useState<string | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [vm, setVm] = useState<VM | null>(null)

    const classes = useStyles()

    useEffect(() => {
        let mounted = true
        StackBlitzSDK.embedGithubProject(path, 'fabianhinz/learnToCode/tree/master/dummy', options)
            .then(instance => {
                if (!mounted) return
                setVm(instance)
            })
            .catch(reason => {
                if (!mounted) return
                setError(reason)
            })

        return () => {
            mounted = false
        }
    }, [path])

    if (error)
        return (
            <Alert color="error">
                <AlertTitle>Stackblitz konnte nicht gestartet werden</AlertTitle>
                {error.toString()}
            </Alert>
        )

    return (
        <div className={classes.stackblitzContainer} key={path}>
            <div id={path} />
        </div>
    )
}

interface Props {
    manual: JSX.Element
    path: string
    onRenderButton: () => JSX.Element
}

const Stackblitz = ({ manual, path, onRenderButton }: Props) => {
    return (
        <LectureSandbox
            title="StackBlitz"
            onRenderButton={onRenderButton}
            onRenderManual={() => manual}>
            {uiReady => uiReady && <StackblitzContainer path={path} />}
        </LectureSandbox>
    )
}

export default Stackblitz
