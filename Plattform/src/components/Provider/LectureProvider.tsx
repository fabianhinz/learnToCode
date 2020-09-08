import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { FirestoreLecturesDoc } from '../../model/firebase'
import { useFirebaseContext } from './FirebaseProvider'

export interface Lecture extends FirestoreLecturesDoc {
    documentId?: string
}

interface FirestoreContext {
    lectureByRelativeDir: Map<string, Lecture>
    onLectureChange: (lecture: Lecture) => void
}

const Context = React.createContext<FirestoreContext | null>(null)

export const useLectureContext = () => useContext(Context)

const LectureProvider: FC = ({ children }) => {
    const [lectureByRelativeDir, setLectureByRelDir] = useState<Map<string, Lecture>>(new Map())

    const { firebaseInstance, user } = useFirebaseContext()

    useEffect(() => {
        if (!user) {
            setLectureByRelDir(new Map())
            return
        }

        const userLecturesDoc = firebaseInstance.firestore().collection('users').doc(user.uid)

        userLecturesDoc.get().then(snapshot => {
            if (snapshot.exists) return
            // user logged in for the first time
            userLecturesDoc.set(user)
        })

        userLecturesDoc.collection('lectures').onSnapshot(snapshot => {
            const lectures = snapshot.docs.map(
                doc => ({ documentId: doc.id, ...doc.data() } as Lecture)
            )

            setLectureByRelDir(
                new Map(lectures.map(l => [`${l.topic}/${l.technology}/${l.lecture}`, l]))
            )
        })
    }, [firebaseInstance, user])

    const onLectureChange = useCallback(
        ({ documentId, ...firestoreDoc }: Lecture) => {
            if (!user) throw new Error('cannot update lecture of a non existing user')

            const collection = firebaseInstance.firestore().collection(`users/${user.uid}/lectures`)

            if (documentId) collection.doc(documentId).set(firestoreDoc)
            else collection.doc().set(firestoreDoc)
        },
        [firebaseInstance, user]
    )

    const providerValue = useMemo(
        () => ({
            lectureByRelativeDir,
            onLectureChange,
        }),
        [lectureByRelativeDir, onLectureChange]
    )

    return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

export default LectureProvider
