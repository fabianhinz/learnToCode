import { Container, makeStyles, Toolbar } from '@material-ui/core'
import React, { FC } from 'react'

import Nav from './Nav'

const useStyles = makeStyles(theme => ({
    container: {
        '& > *': {
            marginTop: theme.spacing(3),
        },
    },
}))

const Main: FC = props => {
    const classes = useStyles()

    return (
        <main>
            <Toolbar />

            <Container className={classes.container} maxWidth="xl">
                <Nav />
                {props.children}
            </Container>
        </main>
    )
}

export default Main
