import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { FirestoreLecturesDoc, UnsubscribeFn } from '../../model/firebase'
import { catalogBase2RelativeDir } from '../../util/mapper'
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

    const { firebaseInstance, resolveUser } = useFirebaseContext()

    useEffect(() => {
        let unsubscribe: UnsubscribeFn
        resolveUser.then(
            user => {
                unsubscribe = firebaseInstance
                    .firestore()
                    .collection(`users/${user.uid}/lectures`)
                    .onSnapshot(snapshot => {
                        const lectures = snapshot.docs.map(
                            doc => ({ documentId: doc.id, ...doc.data() } as Lecture)
                        )

                        setLectureByRelDir(
                            new Map(lectures.map(l => [catalogBase2RelativeDir(l), l]))
                        )
                    })
            },
            _noUser => {
                setLectureByRelDir(new Map())
            }
        )
        return unsubscribe
    }, [firebaseInstance, resolveUser])

    const onLectureChange = useCallback(
        ({ documentId, ...firestoreDoc }: Lecture) => {
            resolveUser.then(user => {
                const collection = firebaseInstance
                    .firestore()
                    .collection(`users/${user.uid}/lectures`)

                if (documentId) collection.doc(documentId).set(firestoreDoc)
                else collection.doc().set(firestoreDoc)
            })
        },
        [firebaseInstance, resolveUser]
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
