import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header/header"
import { CalendarToday, Category } from "@material-ui/icons"

import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Button,
    Chip,
    Divider,
    Typography,
} from "@material-ui/core"

const Lektionen = props => {
    const { edges } = props.data.allMarkdownRemark

    return (
        <Layout>
            <Header />
            <Grid container spacing={4}>
                {edges.map(({ node }) => (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <Card raised>
                            <CardHeader title={node.frontmatter.title} />
                            {node.frontmatter.path && (
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Chip
                                                size="small"
                                                icon={<CalendarToday />}
                                                color="secondary"
                                                label={node.frontmatter.date}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Chip
                                                size="small"
                                                icon={<Category />}
                                                color="secondary"
                                                label={node.frontmatter.path
                                                    .split("/")
                                                    .slice(2, 3)}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Chip
                                                size="small"
                                                icon={<Category />}
                                                color="secondary"
                                                label={node.frontmatter.path
                                                    .split("/")
                                                    .slice(3, 4)}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Chip
                                                size="small"
                                                icon={<Category />}
                                                color="secondary"
                                                label={node.frontmatter.path
                                                    .split("/")
                                                    .slice(-1)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography>
                                                {
                                                    node.frontmatter
                                                        .shortDescription
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            )}

                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Button color="primary">details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export default Lektionen

export const pageQuery = graphql`
    query {
        allMarkdownRemark {
            edges {
                node {
                    id
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        path
                        title
                        shortDescription
                    }
                    html
                }
            }
        }
    }
`
