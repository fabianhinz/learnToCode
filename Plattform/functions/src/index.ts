import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { CommunityRatingDoc, Lecture, UserRatingDoc } from './model'
import { catalogBase2RelativeDir, relativeDir2CatalogBase } from './util'

const serviceAccount = require('../learn2code-service-account.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://learn2code-hska.firebaseio.com',
})

export const handleRatingCollection = functions
    .region('europe-west3')
    .pubsub.schedule('every 24 hours')
    .onRun(
        async (): Promise<any> => {
            const log = functions.logger.log
            const firestore = admin.firestore()
            const ratings = new Map<Lecture, { value: number | null }[]>()

            const usersSnapshot = await firestore.collection('users').get()
            const userUids = usersSnapshot.docs.map(doc => doc.id)

            for (const uid of userUids) {
                const userRatings = await firestore.collection(`users/${uid}/rating`).get()

                for (const rating of userRatings.docs) {
                    const { value, ...catalogBase } = rating.data() as UserRatingDoc
                    const key = catalogBase2RelativeDir(catalogBase)
                    const previous = ratings.get(key)

                    if (value !== null) ratings.set(key, [...(previous ?? []), { value }])
                }
            }
            log(`got ${Array.from(ratings.values()).length} ratings for ${ratings.size} lectures`)

            const ratingOps: Promise<any>[] = []
            // ? delete old rating, each iteration receives a new collection
            const oldRatingCollection = await firestore.collection('rating').get()
            for (const oldRatingDoc of oldRatingCollection.docs) {
                ratingOps.push(firestore.collection('rating').doc(oldRatingDoc.id).delete())
            }
            log(`deleting ${oldRatingCollection.docs.length} old ratings`)

            // ? calculate average rating and vote numbers
            for (const [key, collectedRatings] of ratings.entries()) {
                // tslint:disable-next-line
                const sum = collectedRatings.reduce((acc, obj) => (acc += obj.value ?? 0), 0)
                const average = Number((sum / collectedRatings.length).toFixed(1))

                const writePromise = firestore
                    .collection('rating')
                    .doc()
                    .set({
                        ...relativeDir2CatalogBase(key),
                        votes: collectedRatings.length,
                        average,
                    } as CommunityRatingDoc)
                ratingOps.push(writePromise)
            }
            log(`writing new ratings`)

            return Promise.all(ratingOps)
        }
    )
