import { ClickAwayListener, Grow, makeStyles, Paper } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { isForStatement } from 'typescript'

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        borderRadius: theme.shape.borderRadius * 4,
        boxShadow: theme.shadows[4],
        top: 'calc(100% + 4px)',
        right: 0,
        minWidth: '100%',
        zIndex: 1,
        padding: theme.spacing(1),
    },
}))

interface Props {
    growIn: boolean
    children: ReactNode
    onClose?: () => void
}

const PopoverPaper = ({ children, growIn, onClose }: Props) => {
    const classes = useStyles()

    const handleClickAway = () => {
        if (onClose) onClose()
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Grow in={growIn}>
                <Paper className={classes.paper}>{children}</Paper>
            </Grow>
        </ClickAwayListener>
    )
}

export default PopoverPaper
