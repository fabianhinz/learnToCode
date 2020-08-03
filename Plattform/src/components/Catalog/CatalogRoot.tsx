import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Grid,
    Typography,
} from '@material-ui/core'
import React from 'react'

import PageLayout from '../Layout/PageLayout'
import AppLink from '../Shared/AppLink'

const CatalogRoot = props => {
    return (
        <PageLayout>
            <Grid container spacing={4}>
                {props.pathContext.nodes.map(node => (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <Card variant="outlined">
                            <div style={{ display: 'flex' }}>
                                <CardMedia
                                    style={{ height: 200, flex: '1 0 200px', margin: 16 }}
                                    image={node.frontmatter.iconPath.publicURL}
                                />
                                <div>
                                    <CardHeader title={node.frontmatter.title} />
                                    <CardContent>
                                        <Typography color="textSecondary" variant="subtitle1">
                                            {node.frontmatter.description}
                                        </Typography>
                                        <Grid container spacing={1}>
                                            {node.frontmatter.technologies.map(
                                                (technology, index) => (
                                                    <Grid item key={technology + index}>
                                                        <Chip
                                                            size="small"
                                                            color="secondary"
                                                            label={technology}
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </CardContent>
                                </div>
                            </div>

                            <CardActions style={{ justifyContent: 'flex-end' }}>
                                <AppLink
                                    to={
                                        props.path === '/'
                                            ? props.path + node.frontmatter.title
                                            : props.path + '/' + node.frontmatter.title
                                    }>
                                    <Button color="primary">details</Button>
                                </AppLink>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </PageLayout>
    )
}

export default CatalogRoot
