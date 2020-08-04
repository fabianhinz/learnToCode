import { Breadcrumbs, makeStyles } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { useLocation } from '@reach/router'
import React from 'react'

import AppLink from './Shared/AppLink'

const useStyles = makeStyles(theme => ({
    breadcrumbs: {
        marginBottom: theme.spacing(3),
    },
}))

const Nav = () => {
    const { pathname } = useLocation()
    const classes = useStyles()

    const links = pathname.split('/').filter(Boolean)

    if (links.length === 0) return <></>

    return (
        <Breadcrumbs className={classes.breadcrumbs} separator={<ChevronRight />}>
            {links.map((path, index, arr) => (
                <AppLink
                    textDecoration
                    capitalize
                    key={path}
                    variant="h6"
                    color={arr.slice(-1)[0] === path ? 'textPrimary' : 'textSecondary'}
                    to={'/' + arr.slice(0, index + 1).join('/')}>
                    {path}
                </AppLink>
            ))}
        </Breadcrumbs>
    )
}

export default Nav
