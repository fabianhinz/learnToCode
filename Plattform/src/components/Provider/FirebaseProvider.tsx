import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { FirebaseInstance, FirestoreUserDoc } from '../../model/firebase'

interface FirebaseContext {
    firebaseInstance: FirebaseInstance | null
    authReady: boolean
    resolveUser: Promise<FirestoreUserDoc>
    isLoggedIn: boolean
}

const Context = React.createContext<FirebaseContext | null>(null)

export const useFirebaseContext = () => React.useContext(Context)

const getInstance = async () => {
    // ? gatsby builds static HTML files for each route, firebase will only work with a defined window object
    // source: https://www.gatsbyjs.org/docs/debugging-html-builds/
    if (typeof window === 'undefined') return

    const [instance] = await Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebase/firestore'),
    ])

    if (!instance.apps.length) {
        instance.initializeApp({
            apiKey: 'AIzaSyDg0fmdAetgwRPpyQ16D6D2hZqlDVOvQ-I',
            authDomain: 'learn2code-hska.firebaseapp.com',
            databaseURL: 'https://learn2code-hska.firebaseio.com',
            projectId: 'learn2code-hska',
            storageBucket: 'learn2code-hska.appspot.com',
            messagingSenderId: '398211325564',
            appId: '1:398211325564:web:90eed6fa89441f4230f3f9',
        })
        instance.firestore().enablePersistence({ synchronizeTabs: true })
    }

    return instance
}

const FirebaseProvider: FC = props => {
    const [firebaseInstance, setFirebaseInstance] = useState<FirebaseInstance | null>(null)
    const [user, setUser] = useState<FirestoreUserDoc | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        getInstance().then(setFirebaseInstance)
    }, [])

    useLayoutEffect(() => {
        setIsLoggedIn(Boolean(user))
    }, [user])

    useEffect(() => {
        if (!firebaseInstance) return

        const unsubscribe = firebaseInstance.auth().onAuthStateChanged(authState => {
            if (authState) {
                const userLecturesDoc = firebaseInstance
                    .firestore()
                    .collection('users')
                    .doc(authState.uid)

                userLecturesDoc.get().then(docSnapshot => {
                    if (docSnapshot.exists) {
                        setUser(docSnapshot.data() as FirestoreUserDoc)
                        return
                    }
                    // user logged in for the first time
                    const newUser = {
                        photoURL: authState.providerData[0].photoURL,
                        providerId: authState.providerData[0].providerId,
                        displayName: authState.displayName,
                        uid: authState.uid,
                    }
                    userLecturesDoc.set(newUser).then(() => {
                        setUser(newUser)
                    })
                })
            } else {
                setUser(null)
            }
            setAuthReady(true)
        })

        return unsubscribe
    }, [firebaseInstance])

    const resolveUser = useMemo(
        () => new Promise<FirestoreUserDoc>((resolve, reject) => (user ? resolve(user) : reject())),
        [user]
    )

    if (!firebaseInstance) return <></>

    return (
        <Context.Provider
            value={{
                firebaseInstance,
                authReady,
                resolveUser,
                isLoggedIn,
            }}>
            {props.children}
        </Context.Provider>
    )
}

export default FirebaseProvider
