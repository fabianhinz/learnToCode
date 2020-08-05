import { Container, makeStyles, Toolbar } from '@material-ui/core'
import { useLocation } from '@reach/router'
import React, { FC } from 'react'

import accountImage from '../../static/account.png'
import lectureImage from '../../static/lecture.png'
import rootImage from '../../static/root.png'
import topicOrTechnologyImage from '../../static/topicOrTechnology.png'
import useVibrantBackground from '../hooks/useVibrantBackground'
import Nav from './Nav'

type StyleProps = undefined | { background: string | null; backgroundImage: string }

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    background: {
        position: 'fixed',
        top: theme.mixins.toolbar.minHeight,
        left: 0,
        width: '100vw',
        height: 'calc(max(40vh, 350px) + 64px)',
        transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeOut,
        }),
        backgroundColor: (props: StyleProps) => props?.background,
        backgroundImage: (props: StyleProps) => `url(${props.backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'max(10%, 350px)',
        backgroundPosition: 'center left',
        backgroundOrigin: 'content-box',
        paddingLeft: theme.spacing(2),
        zIndex: -1,
    },
}))

const getBackgroundImage = (pathname: string) => {
    // static links
    if (pathname.includes('account')) return accountImage
    // md based links
    switch (pathname.split('/').filter(Boolean).length) {
        case 0: {
            return rootImage
        }
        case 1: {
            return lectureImage
        }
        case 2:
        case 3: {
            return topicOrTechnologyImage
        }
        default:
            return null
    }
}

const Background = () => {
    const { pathname } = useLocation()
    const backgroundImage = getBackgroundImage(pathname)
    const background = useVibrantBackground(backgroundImage, 'LightMuted')

    const classes = useStyles({ background, backgroundImage })

    return <div className={classes.background} />
}

const Main: FC = props => {
    const classes = useStyles()

    return (
        <>
            <main>
                <Toolbar />

                <Nav />
                <Container className={classes.container} maxWidth="xl">
                    {props.children}
                </Container>
            </main>
            <Background />
        </>
    )
}

export default Main
