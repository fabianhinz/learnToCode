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
import React, { useLayoutEffect, useState } from 'react'

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
        height: '100%',
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
    },
}))

interface Props {
    title: string
    children: (sandboxState: { uiReady: boolean }) => React.ReactNode
    onRenderButton: () => JSX.Element
    onRenderManual: () => JSX.Element
}

const LectureSandbox = ({ title, children, onRenderButton, onRenderManual }: Props) => {
    const [open, setOpen] = useState(false)
    const [transitionEnded, setTransitionEnded] = useState(false)

    const classes = useStyles()

    const { onShowNavTextChange } = useNavTextContext()

    useLayoutEffect(() => {
        onShowNavTextChange(!open)
    }, [onShowNavTextChange, open])

    return (
        <>
            <Drawer
                classes={{ paper: classes.paper }}
                variant="persistent"
                anchor="bottom"
                onTransitionEnd={() => setTransitionEnded(true)}
                open={open}>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <IconButton onClick={() => setOpen(false)} color="inherit">
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
                    <div className={classes.childrenEditor}>
                        {children({ uiReady: open && transitionEnded })}
                    </div>
                </div>
            </Drawer>
            <div onClick={() => setOpen(true)}>{onRenderButton()}</div>
        </>
    )
}

export default LectureSandbox
