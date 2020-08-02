import { Link as MuiLink, LinkProps } from '@material-ui/core'
import { Link } from 'gatsby'
import React, { ReactNode } from 'react'

interface Props extends Omit<LinkProps, 'component'> {
    children: ReactNode
    to: string
}

const AppLink = ({ children, ...linkProps }: Props) => (
    <MuiLink component={Link as any} {...linkProps}>
        {children}
    </MuiLink>
)

export default AppLink
