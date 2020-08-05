import { AppBar, Grid, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'

import Search from './Search/Search'
import AppLink from './Shared/AppLink'
import UserAvatar from './Shared/UserAvatar'

const useStyles = makeStyles(theme => ({
    appbar: {
        maxHeight: 64,
    },
    platform: {
        marginRight: theme.spacing(0.5),
        padding: theme.spacing(0.5),
        border: `2px solid ${theme.palette.text.primary}`,
    },
}))

const Header = () => {
    const classes = useStyles()

    return (
        <header>
            <AppBar color="default" position="fixed" className={classes.appbar}>
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={4}>
                            <AppLink to="/" color="textPrimary" variant="h5">
                                <span className={classes.platform}>learn2Code</span>HsKA
                            </AppLink>
                        </Grid>

                        <Grid item xs={8}>
                            <Grid container alignItems="center" justify="flex-end" spacing={1}>
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
