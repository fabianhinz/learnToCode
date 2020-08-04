import { Breadcrumbs } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { useLocation } from '@reach/router'
import React from 'react'

import AppLink from './Shared/AppLink'

const Nav = () => {
    const { pathname } = useLocation()

    return (
        <Breadcrumbs separator={<ChevronRight />}>
            <AppLink variant="h6" color={pathname === '/' ? 'textPrimary' : 'textSecondary'} to="/">
                Katalog
            </AppLink>
            {pathname.length > 1 &&
                pathname
                    .split('/')
                    .slice(1)
                    .map((path, index, arr) => (
                        <AppLink
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
