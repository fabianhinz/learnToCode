import { Container, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { FC } from 'react'

import viewportTooSmall from '../../static/viewportTooSmall.png'
import Nav from './Nav'
import BackgroundProvider from './Provider/BackgroundProvider'
import NavTextProvider from './Provider/NavTextProvider'

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    img: {
        minWidth: 200,
        [theme.breakpoints.only('xs')]: {
            maxWidth: '80vw',
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50vw',
        },
        marginBottom: theme.spacing(2),
    },
    viewportTooSmallContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(4),
    },
}))

const Main: FC = props => {
    const classes = useStyles()

    return (
        <>
            <Toolbar />
            <main>
                <Hidden implementation="js" smDown>
                    <BackgroundProvider>
                        <NavTextProvider>
                            <Nav />
                            <Container className={classes.container} maxWidth="xl">
                                {props.children}
                            </Container>
                        </NavTextProvider>
                    </BackgroundProvider>
                </Hidden>
                <Hidden implementation="js" mdUp>
                    <div className={classes.viewportTooSmallContainer}>
                        <img
                            className={classes.img}
                            src={viewportTooSmall}
                            alt="viewport too small icon"
                        />

                        <Typography variant="h5">
                            Die Darstellung der Inhalte ist auf Smartphones leider nicht möglich.
                            Bitte benutze ein größeres Gerät.
                        </Typography>
                    </div>
                </Hidden>
            </main>
        </>
    )
}

export default Main
