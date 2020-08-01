import {
    ButtonBase,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React from 'react'

import PageLayout from '../components/PageLayout'

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
    card: {
        boxShadow: theme.shadows[0],
        transition: theme.transitions.create('box-shadow'),
        '&:hover': {
            boxShadow: theme.shadows[4],
            cursor: 'pointer',
        },
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
                            <Card className={classes.card} variant="outlined">
                                <CardActionArea>
                                    <CardHeader title="Sunt sint in eu ipsum nisi incididunt fugiat." />
                                    <CardContent>
                                        <Typography color="textSecondary">
                                            Adipisicing eu elit amet do ullamco pariatur qui labore
                                            ex aliqua anim ut. Sint qui nulla irure ex deserunt
                                            cillum irure veniam voluptate sunt amet tempor ullamco.
                                            Elit consequat ex Lorem consectetur dolor excepteur
                                            excepteur adipisicing do eiusmod mollit.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
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
                            <Card className={classes.card} variant="outlined">
                                <CardActionArea>
                                    <CardHeader title="Sunt sint in eu ipsum nisi incididunt fugiat." />
                                    <CardContent>
                                        <Typography color="textSecondary">
                                            Adipisicing eu elit amet do ullamco pariatur qui labore
                                            ex aliqua anim ut. Sint qui nulla irure ex deserunt
                                            cillum irure veniam voluptate sunt amet tempor ullamco.
                                            Elit consequat ex Lorem consectetur dolor excepteur
                                            excepteur adipisicing do eiusmod mollit.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </PageLayout>
    )
}

export default Index
