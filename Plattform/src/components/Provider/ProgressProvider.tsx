import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { FirestoreUserProgressDoc } from '../../model/firebase'
import { useFirebaseContext } from './FirebaseProvider'

export interface Progress extends FirestoreUserProgressDoc {
    documentId?: string
}

interface AbsoluteProgress {
    done: number
    inProgress: number
}

interface FirestoreContext {
    progressByRelDir: Map<string, Progress>
    progressByTechnology: Map<string, AbsoluteProgress>
    topicsWithProgress: Set<string>
    onProgressChange: (progress: Progress) => void
}

const getProgressIdByProgress = (progress: Progress) => `/${progress.topic}/${progress.technology}`

const Context = React.createContext<FirestoreContext | null>(null)

export const useProgressContext = () => useContext(Context)

const ProgressProvider: FC = ({ children }) => {
    const [progressByRelDir, setProgressByRelDir] = useState<Map<string, Progress>>(new Map())
    const [progressByTechnology, setProgressByTechnology] = useState<Map<string, AbsoluteProgress>>(
        new Map()
    )
    const [topicsWithProgress, setTopicsWithProgress] = useState<Set<string>>(new Set())

    const { firebaseInstance, user } = useFirebaseContext()

    useEffect(() => {
        if (!user) {
            setProgressByRelDir(new Map())
            setProgressByTechnology(new Map())
            setTopicsWithProgress(new Set())
            return
        }

        const userprogressDoc = firebaseInstance.firestore().collection('users').doc(user.uid)

        userprogressDoc.get().then(snapshot => {
            if (snapshot.exists) return
            // user logged in for the first time
            userprogressDoc.set(user)
        })

        userprogressDoc.collection('progress').onSnapshot(snapshot => {
            const progress = snapshot.docs.map(
                doc => ({ documentId: doc.id, ...doc.data() } as Progress)
            )

            const newProgressByTechnology: Map<string, AbsoluteProgress> = new Map()
            for (const uniqueProgressId of new Set(progress.map(getProgressIdByProgress))) {
                newProgressByTechnology.set(uniqueProgressId, {
                    done: progress.filter(
                        p => p.status === 'done' && getProgressIdByProgress(p) === uniqueProgressId
                    ).length,
                    inProgress: progress.filter(
                        p =>
                            p.status === 'inProgress' &&
                            getProgressIdByProgress(p) === uniqueProgressId
                    ).length,
                })
            }

            setTopicsWithProgress(
                new Set(progress.filter(p => p.status === 'done').map(p => p.topic))
            )
            setProgressByTechnology(newProgressByTechnology)
            setProgressByRelDir(
                new Map(progress.map(p => [`${p.topic}/${p.technology}/${p.lecture}`, p]))
            )
        })
    }, [firebaseInstance, user])

    const onProgressChange = useCallback(
        ({ documentId, ...firestoreDoc }: Progress) => {
            if (!user) throw new Error('cannot update progress of a non existing user')

            const collection = firebaseInstance.firestore().collection(`users/${user.uid}/progress`)

            if (documentId) collection.doc(documentId).set(firestoreDoc)
            else collection.doc().set(firestoreDoc)
        },
        [firebaseInstance, user]
    )

    const providerValue = useMemo(
        () => ({
            progressByRelDir,
            progressByTechnology,
            topicsWithProgress,
            onProgressChange,
        }),
        [progressByTechnology, progressByRelDir, onProgressChange, topicsWithProgress]
    )

    return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

export default ProgressProvider
