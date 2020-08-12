import { Button, Hidden, makeStyles } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import StackBlitzSDK from '@stackblitz/sdk'
import { EmbedOptions } from '@stackblitz/sdk/typings/interfaces'
import { VM } from '@stackblitz/sdk/typings/VM'
import React, { useEffect, useState } from 'react'

import { relativeDir2CatalogBase } from '../../util/mapper'
import { LectureNodeProps } from '../Catalog/CatalogLecture'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import { useProgressContext } from '../Provider/ProgressProvider'
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

const StackblitzContainer = ({ path, open }: Pick<Props, 'path'> & { open: boolean }) => {
    const [error, setError] = useState<string | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [vm, setVm] = useState<VM | null>(null)

    const classes = useStyles()

    useEffect(() => {
        if (!open) return

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
    }, [path, open])

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
    path: string
    node: LectureNodeProps
    open: boolean
    onClose: () => void
}

const Stackblitz = ({ path, node, open, onClose }: Props) => {
    const { firebaseInstance, user } = useFirebaseContext()
    const { onProgressChange, progressByRelDir } = useProgressContext()

    const prevProgress = progressByRelDir.get(node.parent.relativeDirectory)

    const handleResolveLecture = () => {
        const { topic, technology, lecture } = relativeDir2CatalogBase(
            node.parent.relativeDirectory
        )

        onProgressChange({
            topic,
            technology,
            lecture,
            status: !prevProgress
                ? 'inProgress'
                : prevProgress.status === 'inProgress'
                ? 'done'
                : 'inProgress',
            lastTimeWorkedOn: firebaseInstance.firestore.Timestamp.fromDate(new Date()),
            documentId: prevProgress?.documentId,
        })
    }

    return (
        <Hidden xsDown implementation="css">
            <LectureSandbox
                open={open}
                onClose={onClose}
                title="StackBlitz"
                onRenderManual={() => (
                    <>
                        {user && (
                            <Button
                                fullWidth
                                onClick={handleResolveLecture}
                                startIcon={<CheckCircle />}>
                                lektion{' '}
                                {!prevProgress || prevProgress.status === 'done'
                                    ? 'starten'
                                    : 'abschließen'}
                            </Button>
                        )}

                        <div dangerouslySetInnerHTML={{ __html: node.html }} />
                    </>
                )}>
                <StackblitzContainer open={open} path={path} />
            </LectureSandbox>
        </Hidden>
    )
}

export default Stackblitz
