import React, { useEffect, useState } from "react"
import { AppBar, Toolbar, Typography, Avatar } from "@material-ui/core"
import { useFirebaseContext } from "../provider/FirebaseProvider"

const Header = () => {
    const { firebase, authUi, user } = useFirebaseContext()

    return (
        <header>
            <AppBar position="sticky">
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Typography variant="h5">learn2Code@HsKA</Typography>
                    {user ? (
                        <Avatar
                            onClick={() => firebase.auth().signOut()}
                            src={user.photoURL}
                        >
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
