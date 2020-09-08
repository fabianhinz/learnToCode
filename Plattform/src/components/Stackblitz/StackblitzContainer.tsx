import { makeStyles, Snackbar } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import StackBlitzSDK from '@stackblitz/sdk'
import { EmbedOptions } from '@stackblitz/sdk/typings/interfaces'
import { VM } from '@stackblitz/sdk/typings/VM'
import React, { useEffect, useState } from 'react'

import { StackblitzFiles } from '../../model/model'
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

const BASE_URI = 'fabianhinz/learnToCode/tree/master/Lektionen/'

const StackblitzContainer = ({
    path,
    open,
    relDir,
}: Pick<StackblitzProps, 'path'> & { open: boolean; relDir: string }) => {
    const [error, setError] = useState<string | null>(null)
    const [vm, setVm] = useState<VM | null>(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const { user } = useFirebaseContext()
    const { lectureByRelativeDir, onLectureChange } = useLectureContext()

    const actualLecture = lectureByRelativeDir.get(relDir)

    const classes = useStyles()

    useEffect(() => {
        if (!open) return

        let mounted = true
        let embededPromise: Promise<VM> | null = null

        if (!user) {
            StackBlitzSDK.embedGithubProject(path, BASE_URI + path, options)
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
        if (actualLecture) {
            embededPromise = StackBlitzSDK.embedProject(
                path,
                {
                    files: actualLecture.files,
                    description: '',
                    title: '',
                    template: 'create-react-app',
                    dependencies: actualLecture.dependencies,
                },
                options
            )
        } else {
            embededPromise = StackBlitzSDK.embedGithubProject(path, BASE_URI + path, options)
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
        // ! wie verhindere ich das rerendern bei speichern der Lektion außer so?
    }, [path, open, user])

    if (error)
        return (
            <Alert color="error">
                <AlertTitle>Stackblitz konnte nicht gestartet werden</AlertTitle>
                {error.toString()}
            </Alert>
        )

    const saveVMSnapshot = async () => {
        const allFiles = (await vm.getFsSnapshot()) as StackblitzFiles
        const dependencies = await vm.getDependencies()
        const { 'package-lock.json': string, ...files } = allFiles
        onLectureChange({
            documentId: actualLecture?.documentId,
            files,
            dependencies,
            ...relativeDir2CatalogBase(relDir),
        })
        // ! wie warte ich hier auf success oder nicht?
        setSnackbarOpen(true)
    }

    return (
        <div className={classes.stackblitzContainer} key={path}>
            <div id={path} />

            {user && (
                <FixedFab color="primary" startIcon={<Save />} onClick={saveVMSnapshot}>
                    speichern
                </FixedFab>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}>
                <Alert elevation={6} onClose={() => setSnackbarOpen(false)} severity="success">
                    Lektion gespeichert
                </Alert>
            </Snackbar>
        </div>
    )
}

export default StackblitzContainer
