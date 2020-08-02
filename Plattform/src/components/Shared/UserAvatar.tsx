import { Avatar, ButtonBase, makeStyles } from '@material-ui/core'
import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { FirebaseInstance, useFirebaseContext } from '../provider/FirebaseProvider'
import AppLink from './AppLink'

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

const UserAvatar = () => {
    const classes = useStyles()

    const { firebaseInstance, user } = useFirebaseContext()

    if (!user)
        return (
            <StyledFirebaseAuth
                uiConfig={getUiConfig(firebaseInstance)}
                firebaseAuth={firebaseInstance.auth()}
            />
        )

    return (
        <div className={classes.userContainer}>
            <AppLink to="/account">
                <ButtonBase className={classes.avatarButton}>
                    <Avatar src={user.photoURL}>{user.displayName[0]}</Avatar>
                </ButtonBase>
            </AppLink>
        </div>
    )
}

export default UserAvatar
