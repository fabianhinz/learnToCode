import React from "react"
import { graphql, Link } from "gatsby"
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
    const { nodes } = props.data.allMarkdownRemark
    console.info(nodes)

    return (
        <Layout>
            <Header />
            <Grid container spacing={4}>
                {nodes.map(node => node.parent.relativeDirectory.split('/')[0] && node.parent.relativeDirectory.split('/').length === 1 && (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <Card raised>
                            <CardHeader title={node.frontmatter.title} />
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
                                    <Grid item xs={12}>
                                        <Typography>{node.frontmatter.shortDescription}</Typography>
                                        <Typography>
                                            Lektionen: {
                                                node.frontmatter
                                                    .lectures
                                            }
                                        </Typography>
                                        <Typography>{node.parent.relativeDirectory}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>

                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Link style={{ marginRight: "1rem" }} to="/technology">
                                    Auf gehts!
                                </Link>
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
            nodes {
                id
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    path
                    title
                    shortDescription
                    lectures
                }
                parent {
                    ... on File {
                      id
                      name
                      relativeDirectory
                    }
                  }
                html
            }
        }
    }
`
