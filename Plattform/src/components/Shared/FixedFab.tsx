import { Fab, FabProps, makeStyles, useMediaQuery, useTheme, Zoom } from '@material-ui/core'
import React, { ReactNode } from 'react'

type StyleProps = Pick<Props, 'stackNumber'> & { smDown: boolean }

const useStyles = makeStyles(theme => ({
    fixedFab: {
        position: 'fixed',
        bottom: (props: StyleProps) =>
            props.stackNumber ? props.stackNumber * (props.smDown ? 100 : 92) : theme.spacing(3),
        right: theme.spacing(3),
    },
    startIcon: {
        marginRight: (props: StyleProps) => (props.smDown ? 0 : theme.spacing(1)),
        display: 'flex',
    },
}))

interface Props extends FabProps {
    startIcon?: ReactNode
    stackNumber?: number
}

const FixedFab = ({ stackNumber, children, startIcon, ...fabProps }: Props) => {
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles({ stackNumber, smDown })

    return (
        <Zoom in>
            <Fab variant={smDown ? 'round' : 'extended'} className={classes.fixedFab} {...fabProps}>
                {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
                {!smDown && children}
            </Fab>
        </Zoom>
    )
}

export default FixedFab
