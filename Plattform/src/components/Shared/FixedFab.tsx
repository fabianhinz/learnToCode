import { Fab, FabProps, makeStyles, Slide } from '@material-ui/core'
import React, { ReactNode } from 'react'

const useStyles = makeStyles(theme => ({
    fixedFab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    startIcon: {
        marginRight: theme.spacing(0.5),
        display: 'flex',
    },
}))

interface Props extends FabProps {
    startIcon?: ReactNode
}

const FixedFab = ({ children, startIcon, ...fabProps }: Props) => {
    const classes = useStyles({})

    return (
        <Slide direction="up" in>
            <Fab variant="extended" className={classes.fixedFab} {...fabProps}>
                {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
                {children}
            </Fab>
        </Slide>
    )
}

export default FixedFab
