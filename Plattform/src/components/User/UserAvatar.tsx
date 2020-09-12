import { Avatar, ButtonBase, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { FirebaseInstance, FirestoreUserDoc } from '../../model/firebase'
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

const useStyles = makeStyles(theme => ({
    userContainer: {
        position: 'relative',
    },
    styledFirebaseAuth: {
        '& .firebaseui-card-content': {
            padding: 0,
        },
        '& .firebaseui-idp-text': {
            whiteSpace: 'nowrap',
        },
        [theme.breakpoints.only('xs')]: {
            '& .firebaseui-idp-text.firebaseui-idp-text-long': {
                display: 'none',
            },
            '& .mdl-button': {
                minWidth: 'unset',
            },
        },
    },
}))

const UserAvatar = () => {
    const classes = useStyles()
    const { firebaseInstance, isLoggedIn, resolveUser } = useFirebaseContext()

    const [avatarInformation, setAvatarInformation] = useState<null | Pick<
        FirestoreUserDoc,
        'photoURL' | 'displayName'
    >>(null)

    useEffect(() => {
        resolveUser.then(({ photoURL, displayName }) =>
            setAvatarInformation({ photoURL, displayName })
        )
    }, [resolveUser])

    if (!isLoggedIn)
        return (
            <StyledFirebaseAuth
                className={classes.styledFirebaseAuth}
                uiConfig={getUiConfig(firebaseInstance)}
                firebaseAuth={firebaseInstance.auth()}
            />
        )

    return (
        <div className={classes.userContainer}>
            <AppLink to="/account">
                <ButtonBase>
                    <Avatar variant="square" src={avatarInformation?.photoURL}>
                        {avatarInformation?.displayName[0]}
                    </Avatar>
                </ButtonBase>
            </AppLink>
        </div>
    )
}

export default UserAvatar
