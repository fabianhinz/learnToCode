import {
    AppBar,
    Drawer,
    Grid,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { useLayoutEffect } from 'react'

import { useNavTextContext } from '../Provider/NavTextProvider'

const useStyles = makeStyles(theme => ({
    paper: {
        height: 'calc(100vh - 128px)',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100vh - 112px)',
        },
        overflow: 'hidden',
    },
    childrenContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    childrenEditor: {
        flex: 1,
        backgroundColor: '#333333',
    },
    childrenManual: {
        flex: '0 0 max(25vw, 400px)',
        padding: theme.spacing(2),
        borderRight: `2px solid ${theme.palette.divider}`,
        // 3 appbars
        height: 'calc(100vh - 193px)',
        overflowY: 'auto',
    },
}))

interface Props {
    title: string
    children: React.ReactNode
    onRenderManual: () => JSX.Element
    open: boolean
    onClose: () => void
}

const LectureSandbox = ({ title, children, onRenderManual, open, onClose }: Props) => {
    const classes = useStyles()

    const { onShowNavTextChange } = useNavTextContext()

    useLayoutEffect(() => {
        onShowNavTextChange(!open)
    }, [onShowNavTextChange, open])

    return (
        <Drawer classes={{ paper: classes.paper }} variant="persistent" anchor="bottom" open={open}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <IconButton onClick={onClose} color="inherit">
                                <Close />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{title}</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.childrenContainer}>
                <div className={classes.childrenManual}>{onRenderManual()}</div>
                <div className={classes.childrenEditor}>{children}</div>
            </div>
        </Drawer>
    )
}

export default LectureSandbox
