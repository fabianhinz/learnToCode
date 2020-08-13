import { CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Check } from '@material-ui/icons'
import { navigate } from 'gatsby'
import React from 'react'

import useVibrantBackground from '../../hooks/useVibrantBackground'
import { TopicNodeProps } from '../Catalog/CatalogTopic'
import ActionCard from '../Shared/ActionCard'

interface StyleProps {
    background: string | null
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

interface Props {
    node: TopicNodeProps
}

const Topic = ({ node }: Props) => {
    const background = useVibrantBackground(node.frontmatter.iconPath.publicURL)
    const classes = useStyles({ background })

    return (
        <ActionCard
            className={classes.card}
            onClick={() => navigate('/' + node.frontmatter.pathTitle)}>
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
                        {node.children.map(({ frontmatter: { pathTitle, title } }, index) => (
                            <Grid item key={pathTitle + index}>
                                <Chip
                                    onClick={e => {
                                        e.stopPropagation()
                                        navigate(node.frontmatter.title + '/' + pathTitle)
                                    }}
                                    icon={<Check />}
                                    size="small"
                                    color="primary"
                                    label={title}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </div>
        </ActionCard>
    )
}

export default Topic
