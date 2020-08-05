import { Divider, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    divider: {
        marginTop: (props: Props) => (props.disableMargin ? undefined : theme.spacing(2)),
        marginBottom: (props: Props) => (props.disableMargin ? undefined : theme.spacing(2)),
        height: 2,
    },
}))

interface Props {
    disableMargin?: boolean
}

const Separator = (props: Props) => {
    const classes = useStyles(props)

    return <Divider variant="middle" className={classes.divider} />
}

export default Separator
