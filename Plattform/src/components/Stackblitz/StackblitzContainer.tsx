import { Button, makeStyles, Zoom } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import StackBlitzSDK from '@stackblitz/sdk'
import { EmbedOptions } from '@stackblitz/sdk/typings/interfaces'
import { VM } from '@stackblitz/sdk/typings/VM'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'

import { StackblitzFiles } from '../../model/model'
import { STACKBLITZ_REPO_SLUG_BASE } from '../../util/constants'
import { createPrefilledIssue } from '../../util/github-service'
import { relativeDir2CatalogBase } from '../../util/mapper'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import { useLectureContext } from '../Provider/LectureProvider'
import FixedFab from '../Shared/FixedFab'
import { StackblitzProps } from './Stackblitz'

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

const StackblitzContainer = ({
    open,
    relDir,
}: Pick<StackblitzProps, 'open'> & { relDir: string }) => {
    const [error, setError] = useState<string | null>(null)
    const [vm, setVm] = useState<VM | null>(null)
    const { enqueueSnackbar } = useSnackbar()

    const { isLoggedIn } = useFirebaseContext()
    const { lectureByRelativeDir, onLectureChange } = useLectureContext()

    const actualLecture = useRef(lectureByRelativeDir.get(relDir))

    const classes = useStyles()

    useEffect(() => {
        if (!open) return

        let mounted = true
        let embededPromise: Promise<VM> | null = null
        const repoSlug = STACKBLITZ_REPO_SLUG_BASE + relDir

        if (!isLoggedIn) {
            StackBlitzSDK.embedGithubProject(relDir, repoSlug, options)
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
        }
        if (actualLecture.current) {
            embededPromise = StackBlitzSDK.embedProject(
                relDir,
                {
                    files: actualLecture.current.files,
                    description: '',
                    title: '',
                    template: 'create-react-app',
                    dependencies: actualLecture.current.dependencies,
                },
                options
            )
        } else {
            embededPromise = StackBlitzSDK.embedGithubProject(relDir, repoSlug, options)
        }

        embededPromise
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
    }, [relDir, open, isLoggedIn])

    if (error)
        return (
            <Alert color="error">
                <AlertTitle>Stackblitz konnte nicht gestartet werden</AlertTitle>
                {error.toString()}
            </Alert>
        )

    const saveVMSnapshot = async () => {
        try {
            const allFiles = (await vm.getFsSnapshot()) as StackblitzFiles
            const dependencies = await vm.getDependencies()
            const { 'package-lock.json': string, ...files } = allFiles
            onLectureChange({
                documentId: actualLecture.current?.documentId,
                files,
                dependencies,
                ...relativeDir2CatalogBase(relDir),
            })
            enqueueSnackbar('Speichern erfolgreich', { variant: 'success', key: relDir })
        } catch (e) {
            enqueueSnackbar('Speichern fehlgeschlagen', {
                variant: 'error',
                persist: true,
                action: (
                    <Button
                        color="inherit"
                        onClick={() =>
                            window.open(
                                createPrefilledIssue({
                                    title: `Problem: Fehler beim Speichern der Lektion ${relDir}, Version: ${__VERSION__}`,
                                    body: `error: ${e.toString()}`,
                                    template: 'platform_bug_template.md',
                                    labels: ['bug', 'platform'],
                                })
                            )
                        }>
                        melden
                    </Button>
                ),
            })
        }
    }

    return (
        <div className={classes.stackblitzContainer} key={relDir}>
            <div id={relDir} />

            <Zoom in={Boolean(vm && isLoggedIn)}>
                <FixedFab color="primary" startIcon={<Save />} onClick={saveVMSnapshot}>
                    speichern
                </FixedFab>
            </Zoom>
        </div>
    )
}

export default StackblitzContainer
