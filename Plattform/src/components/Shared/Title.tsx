import { makeStyles, Typography } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'
import React from 'react'

interface StyleProps {
    pointer: boolean
}

const useStyles = makeStyles(theme => ({
    title: {
        textTransform: 'uppercase',
        backgroundColor: blueGrey[900],
        fontSize: theme.typography.h5.fontSize,
        fontFamily: 'Ubuntu',
        padding: theme.spacing(1),
        color: theme.palette.getContrastText(blueGrey[900]),
        cursor: (props: StyleProps) => (props.pointer ? 'pointer' : undefined),
    },
}))

interface Props {
    children: React.ReactNode
    onClick?: () => void
}

const Title = ({ children, onClick }: Props) => {
    const classes = useStyles({ pointer: Boolean(onClick) })

    return (
        <Typography display="inline" className={classes.title}>
            {children}
        </Typography>
    )
}

export default Title
