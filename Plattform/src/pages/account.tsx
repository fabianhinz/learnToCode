import { Typography } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { Redirect } from '@reach/router'
import React from 'react'

import PageLayout from '../components/Layout/PageLayout'
import { useFirebaseContext } from '../components/provider/FirebaseProvider'
import FixedFab from '../components/Shared/FixedFab'

const Account = () => {
    const { user, firebaseInstance } = useFirebaseContext()

    if (!user) return <Redirect noThrow to="/" />

    return (
        <>
            <PageLayout>
                <Typography variant="h5">Willkommen zurück {user?.displayName}</Typography>
            </PageLayout>

            <FixedFab
                onClick={() => firebaseInstance.auth().signOut().then()}
                color="primary"
                startIcon={<ExitToApp />}>
                ausloggen
            </FixedFab>
        </>
    )
}

export default Account
