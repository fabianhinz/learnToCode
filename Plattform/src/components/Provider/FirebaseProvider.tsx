import React, { FC, useEffect, useState } from 'react'

export type FirebaseInstance = typeof import('firebase/app')

interface User {
    displayName: string
    email: string
    phoneNumber: string
    photoURL: string
    providerId: string
    uid: string
}

interface FirebaseContext {
    firebaseInstance: FirebaseInstance | null
    user: User | null
}

const Context = React.createContext<FirebaseContext | null>(null)

export const useFirebaseContext = () => React.useContext(Context) as FirebaseContext

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
    }

    return instance
}

const FirebaseProvider: FC = props => {
    const [firebaseInstance, setFirebaseInstance] = useState<FirebaseInstance | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getInstance().then(setFirebaseInstance)
    }, [])

    useEffect(() => {
        if (!firebaseInstance) return

        const unsubscribe = firebaseInstance.auth().onAuthStateChanged(authState => {
            if (authState) setUser(authState.providerData[0])
            else setUser(null)
        })

        return () => {
            unsubscribe()
        }
    }, [firebaseInstance])

    if (!firebaseInstance) return <></>

    return (
        <Context.Provider
            value={{
                firebaseInstance,
                user,
            }}>
            {props.children}
        </Context.Provider>
    )
}

export default FirebaseProvider
