import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

import { useFirebaseContext } from './provider/FirebaseProvider'

const Header = () => {
    const { firebase, authUi, user } = useFirebaseContext()

    useEffect(() => {
        console.log(firebase)
    }, [])

    return (
        <header>
            <AppBar position="sticky">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography variant="h5">learn2Code@HsKA</Typography>

                    {user ? (
                        <Avatar onClick={() => firebase.auth().signOut()} src={user.photoURL}>
                            {user.displayName[0]}
                        </Avatar>
                    ) : (
                        authUi
                    )}
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header
