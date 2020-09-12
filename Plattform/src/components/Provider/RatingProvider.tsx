import React, { FC, useContext, useEffect, useState } from 'react'

import {
    FirestoreCommunityRatingDoc,
    FirestoreUserRatingDoc,
    UnsubscribeFn,
} from '../../model/firebase'
import { catalogBase2RelativeDir } from '../../util/mapper'
import { useFirebaseContext } from './FirebaseProvider'

type RelativeDir = string
type UserRatingsMap = Map<RelativeDir, { value: number | null; documentId?: string }>
type CommunityRatingsMap = Map<RelativeDir, { average: number; votes: number }>

interface RatingContext {
    userRatings: UserRatingsMap
    communityRatings: CommunityRatingsMap
    onUserRatingChange: (doc: FirestoreUserRatingDoc) => void
}

const Context = React.createContext<RatingContext>(null)

export const useRatingContext = () => useContext(Context)

const RatingProvider: FC = ({ children }) => {
    const [userRatings, setUserRatings] = useState<UserRatingsMap>(new Map())
    const [communityRatings, setCommunityRatings] = useState<CommunityRatingsMap>(new Map())

    const { firebaseInstance, resolveUser } = useFirebaseContext()

    useEffect(() => {
        let unsubscribe: UnsubscribeFn
        resolveUser.then(
            user => {
                unsubscribe = firebaseInstance
                    .firestore()
                    .collection(`users/${user.uid}/rating`)
                    .onSnapshot(snapshot => {
                        setUserRatings(
                            new Map(
                                snapshot.docs.map(doc => {
                                    const {
                                        value,
                                        ...catalogBase
                                    } = doc.data() as FirestoreUserRatingDoc
                                    return [
                                        catalogBase2RelativeDir(catalogBase),
                                        { value, documentId: doc.id },
                                    ]
                                })
                            )
                        )
                    })
            },
            _noUser => {
                setUserRatings(new Map())
            }
        )

        return unsubscribe
    }, [firebaseInstance, resolveUser])

    useEffect(() => {
        return firebaseInstance
            .firestore()
            .collection('rating')
            .onSnapshot(snapshot => {
                setCommunityRatings(
                    new Map(
                        snapshot.docs.map(doc => {
                            const {
                                average,
                                votes,
                                ...catalogBase
                            } = doc.data() as FirestoreCommunityRatingDoc
                            return [catalogBase2RelativeDir(catalogBase), { average, votes }]
                        })
                    )
                )
            })
    }, [firebaseInstance])

    const onUserRatingChange = ({ topic, technology, lecture, value }: FirestoreUserRatingDoc) => {
        resolveUser.then(user => {
            const collectionRef = firebaseInstance
                .firestore()
                .collection(`users/${user.uid}/rating`)
            const previousRating = userRatings.get(
                catalogBase2RelativeDir({ topic, technology, lecture })
            )

            if (!previousRating || !previousRating.documentId) {
                collectionRef
                    .doc()
                    .set({ topic, technology, lecture, value } as FirestoreUserRatingDoc)
            } else {
                collectionRef.doc(previousRating.documentId).set({ value }, { merge: true })
            }
        })
    }

    return (
        <Context.Provider value={{ userRatings, onUserRatingChange, communityRatings }}>
            {children}
        </Context.Provider>
    )
}

export default RatingProvider
