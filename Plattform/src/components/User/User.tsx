import { Grid } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { Redirect } from '@reach/router'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import FixedFab from '../Shared/FixedFab'
import Title from '../Shared/Title'
import UserProgress from './UserProgress'

const User = (props: GatsbyProps) => {
    const { user, firebaseInstance } = useFirebaseContext()

    if (!user) return <Redirect noThrow to="/" />

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Title>Willkommen zurück {user?.displayName}</Title>
                </Grid>

                {props.pathContext.node.children.map(node => (
                    <Grid item xs={12} lg={6} key={node.id}>
                        <UserProgress node={node} />
                    </Grid>
                ))}
            </Grid>

            <FixedFab
                onClick={() => firebaseInstance.auth().signOut().then()}
                color="primary"
                startIcon={<ExitToApp />}>
                ausloggen
            </FixedFab>
        </>
    )
}

export default User
