import { AppBar, Avatar, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

import { useFirebaseContext } from './provider/FirebaseProvider'
import Search from './Search/Search'

const useStyles = makeStyles(() => ({
    appbar: {
        maxHeight: 64,
    },
}))

const Header = () => {
    const { firebase, authUi, user } = useFirebaseContext()
    const classes = useStyles()

    return (
        <header>
            <AppBar color="default" position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h5">learn2Code@HsKA</Typography>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Search />
                                </Grid>
                                <Grid item>
                                    {user ? (
                                        <Avatar
                                            onClick={() => firebase.auth().signOut()}
                                            src={user.photoURL}>
                                            {user.displayName[0]}
                                        </Avatar>
                                    ) : (
                                        authUi
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header
