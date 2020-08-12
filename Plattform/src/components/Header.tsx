import { AppBar, Grid, Hidden, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'

import Search from './Search/Search'
import Brand from './Shared/Brand'
import UserAvatar from './User/UserAvatar'

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
                        <Grid item xs={4}>
                            <Brand variant="h5" />
                        </Grid>

                        <Grid item xs={8}>
                            <Grid container alignItems="center" justify="flex-end" spacing={2}>
                                <Hidden smDown>
                                    <Grid item>
                                        <Search />
                                    </Grid>
                                </Hidden>
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
