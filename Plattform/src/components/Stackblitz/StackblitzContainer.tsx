import { makeStyles } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import StackBlitzSDK from '@stackblitz/sdk'
import { EmbedOptions } from '@stackblitz/sdk/typings/interfaces'
import { VM } from '@stackblitz/sdk/typings/VM'
import React, { useEffect, useState } from 'react'

import { useFirebaseContext } from '../Provider/FirebaseProvider'
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

const BASE_URI = 'fabianhinz/learnToCode/tree/feature/saveProjects/Lektionen/'

const StackblitzContainer = ({ path, open }: Pick<StackblitzProps, 'path'> & { open: boolean }) => {
    const [error, setError] = useState<string | null>(null)
    const [vm, setVm] = useState<VM | null>(null)

    const { user, firebaseInstance } = useFirebaseContext()

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

        firebaseInstance
            .firestore()
            .collection(`users/${user.uid}/lectures`)
            .doc(path.replace(/\//g, ''))
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    const data = snapshot.data()
                    embededPromise = StackBlitzSDK.embedProject(
                        path,
                        {
                            files: data.files,
                            description: '',
                            title: '',
                            template: 'create-react-app',
                            dependencies: data.dependencies,
                        },
                        options
                    )
                } else {
                    embededPromise = StackBlitzSDK.embedGithubProject(
                        path,
                        BASE_URI + path,
                        options
                    )
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
            })

        return () => {
            mounted = false
        }
    }, [path, open, firebaseInstance, user])

    if (error)
        return (
            <Alert color="error">
                <AlertTitle>Stackblitz konnte nicht gestartet werden</AlertTitle>
                {error.toString()}
            </Alert>
        )

    const saveVMSnapshot = async () => {
        const files = await vm.getFsSnapshot()
        const dependencies = await vm.getDependencies()
        firebaseInstance
            .firestore()
            .collection(`users/${user.uid}/lectures`)
            .doc(path.replace(/\//g, ''))
            .set({ files, dependencies })
    }

    return (
        <div className={classes.stackblitzContainer} key={path}>
            <div id={path} />{' '}
            {user && (
                <FixedFab color="primary" startIcon={<Save />} onClick={saveVMSnapshot}>
                    speichern
                </FixedFab>
            )}
        </div>
    )
}

export default StackblitzContainer
