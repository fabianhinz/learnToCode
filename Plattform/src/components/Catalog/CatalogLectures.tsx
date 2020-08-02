import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from '@material-ui/core'
import React from 'react'

import PageLayout from '../Layout/PageLayout'

interface Props {
    path: string
    pathContext: {
        nodes: {
            id: string
            frontmatter: {
                title: string
                shortDescription: string
                lectures: string
            }
            parent: {
                relativeDirectory: string
            }
        }[]
    }
}

const CatalogLectures = (props: Props) => {
    const nodes = props.pathContext.nodes

    return (
        <PageLayout>
            <Grid container spacing={4}>
                {nodes.map(
                    node =>
                        props.path === '/' + node.parent.relativeDirectory && (
                            <Grid item xs={12} md={6} xl={4} key={node.id}>
                                <Card raised>
                                    <CardHeader
                                        title={node.frontmatter.title + '\nHi I am lectures'}
                                    />
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    {node.frontmatter.shortDescription}
                                                </Typography>
                                                <Typography>
                                                    Lektionen: {node.frontmatter.lectures}
                                                </Typography>
                                                <Typography>
                                                    {node.parent.relativeDirectory}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                                    <CardActions style={{ justifyContent: 'flex-end' }}>
                                        <Button>Donwload</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                )}
            </Grid>
        </PageLayout>
    )
}

export default CatalogLectures
