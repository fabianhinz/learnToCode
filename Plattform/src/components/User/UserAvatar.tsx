import { Avatar, ButtonBase, makeStyles } from '@material-ui/core'
import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { FirebaseInstance } from '../../model/firebase'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import AppLink from '../Shared/AppLink'

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
                <ButtonBase>
                    <Avatar variant="square" src={user.photoURL}>
                        {user.displayName[0]}
                    </Avatar>
                </ButtonBase>
            </AppLink>
        </div>
    )
}

export default UserAvatar
