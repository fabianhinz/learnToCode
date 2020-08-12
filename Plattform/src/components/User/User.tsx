import { Card, Grid, List } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { Redirect } from '@reach/router'
import React from 'react'

import accountImage from '../../../static/account.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import { NodeContext } from '../../model/model'
import { RootNodeProps } from '../Catalog/CatalogRoot'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import { useProgressContext } from '../Provider/ProgressProvider'
import FixedFab from '../Shared/FixedFab'
import Title from '../Shared/Title'
import UserProgress from './UserProgress'

const User = (props: NodeContext<RootNodeProps>) => {
    const { user, firebaseInstance } = useFirebaseContext()
    const { topicsWithProgress } = useProgressContext()

    useBackgroundEffect(accountImage)

    if (!user) return <Redirect noThrow to="/" />

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Title>Willkommen zurück {user?.displayName}</Title>
                </Grid>

                <Grid item xs={12}>
                    <Card elevation={4}>
                        <List disablePadding>
                            {props.pathContext.node.children
                                .filter(node => topicsWithProgress.has(node.frontmatter.pathTitle))
                                .map(node => (
                                    <UserProgress node={node} key={node.id} />
                                ))}
                        </List>
                    </Card>
                </Grid>
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
