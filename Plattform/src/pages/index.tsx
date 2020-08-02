import { ButtonBase, Grid, makeStyles, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React from 'react'

import PageLayout from '../components/PageLayout'
import CardBase from '../Components/Shared/CardBase'

const useStyles = makeStyles(theme => ({
    pathButton: {
        ...theme.typography.h6,
        textTransform: 'uppercase',
        backgroundColor: green.A200,
        color: theme.palette.getContrastText(green.A200),
        width: '100%',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius * 4,
    },
}))

const MOCK_CARDS = new Array(3).fill(1)

const Index = () => {
    const classes = useStyles()

    return (
        <PageLayout>
            <ButtonBase className={classes.pathButton}>
                Auf Niveau angepassten Lernpfad starten
            </ButtonBase>

            <div>
                <Typography gutterBottom variant="h5">
                    Fortsetzen
                </Typography>
                <Grid container spacing={3}>
                    {MOCK_CARDS.map((_, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <CardBase />
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div>
                <Typography gutterBottom variant="h5">
                    Katalog
                </Typography>
                <Grid container spacing={3}>
                    {MOCK_CARDS.map((_, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <CardBase />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </PageLayout>
    )
}

export default Index
