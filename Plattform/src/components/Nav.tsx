import { Breadcrumbs, Collapse, makeStyles, Typography } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { useLocation } from '@reach/router'
import React from 'react'

import { useNavTextContext } from './Provider/NavTextProvider'
import AppLink from './Shared/AppLink'

const useStyles = makeStyles(theme => ({
    navContainer: {
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        backgroundColor:
            theme.palette.type === 'dark' ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)',
        backdropFilter: 'blur(5px)',
        position: 'sticky',
        top: 64,
        zIndex: theme.zIndex.appBar - 1,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
            top: 56,
        },
    },
}))

const Nav = () => {
    const { pathname } = useLocation()
    const classes = useStyles()
    const { navText, showNavText } = useNavTextContext()

    const links = pathname.split('/').filter(Boolean)

    if (links.length === 0) return <></>

    return (
        <div className={classes.navContainer}>
            <Breadcrumbs separator={<ChevronRight />}>
                {links.map((path, index, arr) => {
                    const isActivePath = arr.slice(-1)[0] === path
                    const to = isActivePath ? undefined : '/' + arr.slice(0, index + 1).join('/')
                    return (
                        <AppLink
                            textDecoration={!isActivePath}
                            capitalize
                            key={path}
                            variant="h6"
                            color={isActivePath ? 'textPrimary' : 'textSecondary'}
                            to={to}>
                            {path}
                        </AppLink>
                    )
                })}
            </Breadcrumbs>
            <Collapse in={showNavText}>
                <Typography variant="subtitle1">{navText}</Typography>
            </Collapse>
        </div>
    )
}

export default Nav
