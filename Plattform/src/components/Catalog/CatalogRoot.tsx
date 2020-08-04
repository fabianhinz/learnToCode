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
import Vibrant from 'node-vibrant'
import React, { useLayoutEffect, useState } from 'react'

import { GatsbyProps, PathContextNode } from '../../model/model'
import AppLink from '../Shared/AppLink'

interface StyleProps {
    iconContainerBackground: string | null
}

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    iconContainer: {
        transition: theme.transitions.create('background-color'),
        backgroundColor: (props: StyleProps) => props.iconContainerBackground,
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
    const [iconContainerBackground, setIconContainerBackground] = useState<string | null>(null)
    const classes = useStyles({ iconContainerBackground })

    useLayoutEffect(() => {
        Vibrant.from(node.frontmatter.iconPath.publicURL)
            .getSwatches()
            .then(palette => setIconContainerBackground(palette.LightVibrant.hex))
    }, [node.frontmatter.iconPath.publicURL])

    return (
        <Card variant="outlined" className={classes.card}>
            <div className={classes.iconContainer}>
                <img
                    alt={node.frontmatter.title + ' icon'}
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
                        {node.frontmatter.technologies.map((technology, index) => (
                            <Grid item key={technology + index}>
                                <Chip size="small" color="primary" label={technology} />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <AppLink to={'/' + node.frontmatter.title}>
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
            <Grid container spacing={2}>
                {props.pathContext.nodes.map(node => (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <RootElement node={node} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default CatalogRoot
