import { CatalogBase } from './model'

export interface FirestoreUserRatingDoc extends CatalogBase {
    value: number | null
}

export interface FirestoreCommunityRatingDoc extends CatalogBase {
    average: number
    votes: number
}

export interface FirestoreUserProgressDoc extends CatalogBase {
    status: 'inProgress' | 'done'
    lastTimeWorkedOn: import('firebase/app').firestore.Timestamp
}

export interface FirestoreUserDoc {
    displayName: string
    photoURL: string
    providerId: string
    uid: string
    introduction?: boolean
}

export type FirebaseInstance = typeof import('firebase/app')
