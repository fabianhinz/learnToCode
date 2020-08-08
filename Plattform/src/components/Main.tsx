import { Container, makeStyles, Toolbar } from '@material-ui/core'
import React, { FC } from 'react'

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
}))

const Main: FC = props => {
    const classes = useStyles()

    return (
        <>
            <Toolbar />
            <main>
                <BackgroundProvider>
                    <NavTextProvider>
                        <Nav />
                        <Container className={classes.container} maxWidth="xl">
                            {props.children}
                        </Container>
                    </NavTextProvider>
                </BackgroundProvider>
            </main>
        </>
    )
}

export default Main
