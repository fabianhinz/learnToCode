import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useFirebaseContext } from './FirebaseProvider'

interface Progress {
    topic: string
    technology: string
    lecture: string
    status: 'inProgress' | 'done'
    lastTimeWorkedOn: import('firebase/app').firestore.Timestamp
    documentId?: string
}

interface FirestoreContext {
    userprogress: Progress[]
    userprogressByDir: Map<string, Progress>
    onProgressChange: (progress: Progress) => void
}

const Context = React.createContext<FirestoreContext | null>(null)

export const useFirestoreContext = () => useContext(Context)

const FirestoreProvider: FC = ({ children }) => {
    const [userprogress, setUserprogress] = useState<Progress[]>([])
    const [userprogressByDir, setUserprogressByDir] = useState<Map<string, Progress>>(new Map())

    const { firebaseInstance, user } = useFirebaseContext()

    useEffect(() => {
        if (!user) return

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
            setUserprogress(progress)
            setUserprogressByDir(
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

    const providerValue = useMemo(() => ({ userprogress, userprogressByDir, onProgressChange }), [
        userprogress,
        userprogressByDir,
        onProgressChange,
    ])

    return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

export default FirestoreProvider
