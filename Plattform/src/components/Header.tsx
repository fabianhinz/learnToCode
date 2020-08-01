import {
    AppBar,
    Avatar,
    Grid,
    Link as MuiLink,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { Link } from 'gatsby'
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
            <AppBar color="default" position="fixed" className={classes.appbar}>
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <MuiLink component={Link} to="/" color="textPrimary">
                                <Typography variant="h5">learn2Code@HsKA</Typography>
                            </MuiLink>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
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
