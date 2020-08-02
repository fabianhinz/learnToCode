import { Grow, makeStyles, Paper } from '@material-ui/core'
import React, { ReactNode } from 'react'

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
}

const PopoverPaper = ({ children, growIn }: Props) => {
    const classes = useStyles()

    return (
        <Grow in={growIn}>
            <Paper className={classes.paper}>{children}</Paper>
        </Grow>
    )
}

export default PopoverPaper
