import { Card, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: theme.shadows[0],
        transition: theme.transitions.create('box-shadow'),
        '&:hover': {
            boxShadow: theme.shadows[4],
            cursor: 'pointer',
        },
        padding: theme.spacing(2),
    },
}))

const CardBase = () => {
    const classes = useStyles()

    return (
        <Card variant="outlined" className={classes.card}>
            Sint veniam tempor voluptate ex qui deserunt ea eu enim minim ea pariatur laboris. Enim
            exercitation aute quis voluptate proident tempor exercitation tempor consectetur labore
            nostrud pariatur. Do nulla est exercitation incididunt nisi reprehenderit enim proident
            ad. Aute tempor ad eu velit aliquip aliqua. Commodo velit non voluptate occaecat fugiat
            aliqua fugiat anim in excepteur officia fugiat sint.
        </Card>
    )
}

export default CardBase
