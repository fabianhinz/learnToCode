import { Avatar, Button, ButtonBase, makeStyles } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React, { useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { FirebaseInstance, useFirebaseContext } from '../provider/FirebaseProvider'
import PopoverPaper from '../Shared/PopoverPaper'

const getUiConfig = (firebase: FirebaseInstance): firebaseui.auth.Config => ({
    signInFlow: 'popup',
    callbacks: {
        // ? this deactivates the redirect after a successful login
        signInSuccessWithAuthResult: () => false,
    },
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
})

const useStyles = makeStyles(() => ({
    userContainer: {
        position: 'relative',
    },
    avatarButton: {
        borderRadius: '50%',
    },
}))

const User = () => {
    const [popoverOpen, setPopoverOpen] = useState(false)

    const classes = useStyles()

    const { firebaseInstance, user } = useFirebaseContext()

    if (!user)
        return (
            <StyledFirebaseAuth
                uiConfig={getUiConfig(firebaseInstance)}
                firebaseAuth={firebaseInstance.auth()}
            />
        )
    console.log({ popoverOpen })
    return (
        <div className={classes.userContainer}>
            <ButtonBase
                onClick={() => setPopoverOpen(!popoverOpen)}
                className={classes.avatarButton}>
                <Avatar src={user.photoURL}>{user.displayName[0]}</Avatar>
            </ButtonBase>

            <PopoverPaper growIn={popoverOpen} onClose={() => setPopoverOpen(false)}>
                Eu ad eiusmod et reprehenderit exercitation. Aliquip in dolore nisi nulla pariatur
                ex veniam tempor voluptate. Cillum nisi cupidatat ullamco dolore.
                <Button
                    startIcon={<AccountCircle />}
                    onClick={() => firebaseInstance.auth().signOut()}>
                    ausloggen
                </Button>
            </PopoverPaper>
        </div>
    )
}

export default User
