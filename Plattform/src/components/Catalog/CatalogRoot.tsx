import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { Check } from '@material-ui/icons'
import React from 'react'

import useVibrantBackground from '../../hooks/useVibrantBackground'
import { GatsbyProps, PathContextNode } from '../../model/model'
import Introduction from '../Introduction/Introduction'
import AppLink from '../Shared/AppLink'
import Title from '../Shared/Title'

interface StyleProps {
    background: string | null
}

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        boxShadow: theme.shadows[4],
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    iconContainer: {
        transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeOut,
        }),
        backgroundColor: (props: StyleProps) => props.background,
        flex: '1 0 200px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            height: 200,
        },
    },
    icon: {
        width: '80%',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: 'unset',
            height: '80%',
        },
    },
}))

interface RootElementProps {
    node: PathContextNode
}

const RootElement = ({ node }: RootElementProps) => {
    const background = useVibrantBackground(node.frontmatter.iconPath.publicURL)
    const classes = useStyles({ background })

    return (
        <Card className={classes.card}>
            <div className={classes.iconContainer}>
                <img
                    alt={node.frontmatter.pathTitle + ' icon'}
                    className={classes.icon}
                    src={node.frontmatter.iconPath.publicURL}
                />
            </div>
            <div>
                <CardHeader title={node.frontmatter.title} />
                <CardContent>
                    <Typography gutterBottom color="textSecondary" variant="subtitle1">
                        {node.frontmatter.description}
                    </Typography>

                    <Grid container spacing={1} justify="flex-end">
                        {node.children.map((technology, index) => (
                            <Grid item key={technology.frontmatter.pathTitle + index}>
                                <Chip
                                    icon={<Check />}
                                    size="small"
                                    color="primary"
                                    label={technology.frontmatter.title}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <AppLink to={'/' + node.frontmatter.pathTitle}>
                        <Button color="secondary">details</Button>
                    </AppLink>
                </CardActions>
            </div>
        </Card>
    )
}

const CatalogRoot = (props: GatsbyProps) => {
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Introduction />
                </Grid>
                <Grid item xs={12}>
                    <Title onClick={() => null}>Fortsetzen</Title>
                </Grid>
                {props.pathContext.node.children.slice(-1).map(node => (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <RootElement node={node} />
                    </Grid>
                ))}

                <Grid item xs={12}>
                    <Title>Katalog</Title>
                </Grid>
                {props.pathContext.node.children.map(node => (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <RootElement node={node} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default CatalogRoot
