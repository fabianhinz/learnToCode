import { AppBar, Grid, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'

import Search from './Search/Search'
import AppLink from './Shared/AppLink'
import UserAvatar from './Shared/UserAvatar'

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
                            <AppLink to="/" color="textPrimary" variant="h4">
                                learn2Code@HsKA
                            </AppLink>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Search />
                                </Grid>
                                <Grid item>
                                    <UserAvatar />
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
