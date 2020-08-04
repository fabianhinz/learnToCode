import { Link as MuiLink, LinkProps, makeStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import React, { ReactNode } from 'react'

type StyleProps = Pick<Props, 'capitalize' | 'textDecoration'>

const useStyles = makeStyles(() => ({
    link: {
        textTransform: (props: StyleProps) => (props.capitalize ? 'capitalize' : undefined),
        '&:hover': {
            textDecoration: (props: StyleProps) => (props.textDecoration ? 'underline' : 'none'),
        },
    },
}))

interface Props extends Omit<LinkProps, 'component'> {
    children: ReactNode
    to?: string
    capitalize?: boolean
    textDecoration?: boolean
}

const AppLink = ({ children, capitalize, textDecoration, ...linkProps }: Props) => {
    const classes = useStyles({ capitalize, textDecoration })

    return (
        <MuiLink
            color="textPrimary"
            className={classes.link}
            component={linkProps.to ? (Link as any) : undefined}
            {...linkProps}>
            {children}
        </MuiLink>
    )
}

export default AppLink
