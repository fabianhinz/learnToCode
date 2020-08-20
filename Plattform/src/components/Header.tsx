import {
    AppBar,
    Drawer,
    Grid,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { Info, Menu as MenuIcon, QuestionAnswer } from '@material-ui/icons'
import { navigate } from 'gatsby'
import React, { useState } from 'react'

import Search from './Search/Search'
import Brand from './Shared/Brand'
import UserAvatar from './User/UserAvatar'

const useStyles = makeStyles(theme => ({
    appbar: {
        maxHeight: 64,
        zIndex: theme.zIndex.modal + 1,
    },
    menuIcon: {
        marginRight: theme.spacing(1),
    },
    paper: {
        flexDirection: 'column',
    },
    list: {
        flexGrow: 1,
    },
}))

const HeaderDrawer = () => {
    const [open, setOpen] = useState(false)

    const classes = useStyles()

    const go2Path = (path: string) => () => {
        setOpen(false)
        navigate(path)
    }

    return (
        <>
            <IconButton onClick={() => setOpen(!open)} className={classes.menuIcon}>
                <MenuIcon />
            </IconButton>

            <Drawer
                // let the search be focusable ;)
                disableEnforceFocus
                classes={{ paper: classes.paper }}
                open={open}
                onClose={() => setOpen(false)}>
                <Toolbar />
                <List className={classes.list}>
                    <ListItem button onClick={go2Path('/faq')}>
                        <ListItemAvatar>
                            <QuestionAnswer />
                        </ListItemAvatar>
                        <ListItemText primary="FAQ" secondary="häufig gestellte Fragen" />
                    </ListItem>
                    <ListItem button onClick={go2Path('/about')}>
                        <ListItemAvatar>
                            <Info />
                        </ListItemAvatar>
                        <ListItemText primary="About" secondary="Informationen zum Projekt" />
                    </ListItem>
                </List>
                <Typography align="center" gutterBottom color="textSecondary" variant="caption">
                    Version: {__VERSION__}
                </Typography>
            </Drawer>
        </>
    )
}

const Header = () => {
    const classes = useStyles()

    return (
        <header>
            <AppBar color="default" position="fixed" className={classes.appbar}>
                <Toolbar>
                    <HeaderDrawer />
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Brand variant="h5" />
                        </Grid>

                        <Grid item>
                            <Grid container wrap="nowrap" alignItems="center" spacing={2}>
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
