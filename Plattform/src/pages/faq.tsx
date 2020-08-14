import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Grid,
    Typography,
    withStyles,
} from '@material-ui/core'
import React from 'react'

import faqImage from '../../static/faq.png'
import Title from '../components/Shared/Title'
import useBackgroundEffect from '../hooks/useBackgroundEffect'

const FaqSummary = withStyles(theme => ({
    content: { alignItems: 'center', '& > *': { marginRight: theme.spacing(1) } },
}))(AccordionSummary)

// ? ToDo tbd
const Faq = () => {
    useBackgroundEffect(faqImage)

    return (
        <Grid container spacing={4} direction="column">
            <Grid item>
                <Title>Häufig gestellte Fragen</Title>
            </Grid>
            <Grid item>
                {new Array(10).fill(1).map((_, index) => (
                    <Accordion key={index}>
                        <FaqSummary>
                            <Avatar variant="square">{index + 1}</Avatar>
                            <Typography variant="h6">Commodo incididunt</Typography>
                        </FaqSummary>
                        <AccordionDetails>
                            Veniam in anim qui et. Velit id magna laborum officia mollit ullamco
                            proident laborum magna est esse id ut ad. Ea irure commodo laboris
                            laborum commodo. Nulla ea id ipsum ipsum sunt magna culpa minim. Magna
                            nostrud pariatur ut nisi et. Quis commodo nostrud elit consectetur sunt
                            et in non duis esse.
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Grid>
        </Grid>
    )
}

export default Faq
