import { Fab, FabProps, makeStyles, Slide } from '@material-ui/core'
import React, { ReactNode } from 'react'

type StyleProps = Pick<Props, 'stackNumber'>

const useStyles = makeStyles(theme => ({
    fixedFab: {
        position: 'fixed',
        bottom: (props: StyleProps) =>
            props.stackNumber ? props.stackNumber * 96 : theme.spacing(3),
        right: theme.spacing(3),
    },
    startIcon: {
        marginRight: theme.spacing(1),
        display: 'flex',
    },
}))

interface Props extends FabProps {
    startIcon?: ReactNode
    stackNumber?: number
}

const FixedFab = ({ stackNumber, children, startIcon, ...fabProps }: Props) => {
    const classes = useStyles({ stackNumber })

    return (
        <Slide direction="left" in>
            <Fab variant="extended" className={classes.fixedFab} {...fabProps}>
                {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
                {children}
            </Fab>
        </Slide>
    )
}

export default FixedFab
