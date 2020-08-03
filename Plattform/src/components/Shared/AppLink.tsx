import { Link as MuiLink, LinkProps, makeStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import React, { ReactNode } from 'react'

interface Props extends Omit<LinkProps, 'component'> {
    children: ReactNode
    to: string
}

const useStyles = makeStyles(() => ({
    link: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
}))

const AppLink = ({ children, ...linkProps }: Props) => {
    const classes = useStyles()

    return (
        <MuiLink className={classes.link} component={Link as any} {...linkProps}>
            {children}
        </MuiLink>
    )
}

export default AppLink
