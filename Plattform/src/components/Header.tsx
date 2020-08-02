import { AppBar, Grid, Link as MuiLink, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'gatsby'
import React from 'react'

import Search from './Search/Search'
import User from './User/User'

const useStyles = makeStyles(() => ({
    appbar: {
        maxHeight: 64,
    },
}))

const Header = () => {
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
                                    <User />
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
