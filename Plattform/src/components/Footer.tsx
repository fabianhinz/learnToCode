import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        paddingBottom: '10px',
    },
    content: {
        color: 'gray',
    },
}))

const Footer = () => {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Typography className={classes.content}>Version: {__VERSION__}</Typography>
        </footer>
    )
}

export default Footer
