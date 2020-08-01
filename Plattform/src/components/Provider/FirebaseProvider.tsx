import React, { FC, useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

type Firebase = typeof import('firebase/app')

interface User {
    displayName: string
    email: string
    phoneNumber: string
    photoURL: string
    providerId: string
    uid: string
}

interface FirebaseContext {
    firebase: Firebase
    user: User
    authUi: JSX.Element
}

const Context = React.createContext<FirebaseContext | null>(null)

export const useFirebaseContext = () => React.useContext(Context) as FirebaseContext

const getUiConfig = (firebase: Firebase): firebaseui.auth.Config => ({
    signInFlow: 'popup',
    callbacks: {
        // ? this deactivates the redirect after a successful login
        signInSuccessWithAuthResult: () => false,
    },
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
})

const FirebaseProvider: FC = props => {
    const [firebase, setFirebase] = useState<Firebase | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // ? gatsby builds static HTML files for each route, firebase will only work with a defined window object
        // source: https://www.gatsbyjs.org/docs/debugging-html-builds/
        if (firebase || typeof window === 'undefined') return

        Promise.all([
            import('firebase/app'),
            import('firebase/auth'),
            import('firebase/firestore'),
        ]).then(([instance]) => {
            instance.initializeApp({
                apiKey: 'AIzaSyDg0fmdAetgwRPpyQ16D6D2hZqlDVOvQ-I',
                authDomain: 'learn2code-hska.firebaseapp.com',
                databaseURL: 'https://learn2code-hska.firebaseio.com',
                projectId: 'learn2code-hska',
                storageBucket: 'learn2code-hska.appspot.com',
                messagingSenderId: '398211325564',
                appId: '1:398211325564:web:90eed6fa89441f4230f3f9',
            })
            setFirebase(instance)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!firebase) return

        const unsubscribe = firebase.auth().onAuthStateChanged(authState => {
            if (authState) setUser(authState.providerData[0])
            else setUser(null)
        })

        return () => {
            unsubscribe()
        }
    }, [firebase])

    if (!firebase) return <></>

    return (
        <Context.Provider
            value={{
                firebase,
                user,
                authUi: (
                    <StyledFirebaseAuth
                        uiConfig={getUiConfig(firebase)}
                        firebaseAuth={firebase.auth()}
                    />
                ),
            }}>
            {props.children}
        </Context.Provider>
    )
}

export default FirebaseProvider
