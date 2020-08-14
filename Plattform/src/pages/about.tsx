import { Grid } from '@material-ui/core'
import React from 'react'

import aboutImage from '../../static/about.png'
import Title from '../components/Shared/Title'
import { useBackgroundEffect } from '../hooks/useBackgroundEffect'
// ? ToDo tbd + "https://trello.com/c/B2ilZKPR/28-credit-the-authors-flaticon"
const About = () => {
    useBackgroundEffect(aboutImage)

    return (
        <Grid container spacing={4} direction="column">
            <Grid item>
                <Title>Ziel</Title>
            </Grid>

            <Grid item>
                <Title>Anregungen</Title>
            </Grid>

            <Grid item>
                <Title>Quellen</Title>
            </Grid>
        </Grid>
    )
}

export default About
