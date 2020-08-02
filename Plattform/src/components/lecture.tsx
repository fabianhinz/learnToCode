import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "./layout"
import Header from "./header/header"
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

interface Props {
    path: string,
    pathContext: {
        nodes: {
            id: string,
            frontmatter: {
                title: string,
                shortDescription: string,
                lectures: string
            },
            parent: {
                relativeDirectory: string
            }
        }[]
    }
}

const Lectures = (props: Props) => {
    const nodes = props.pathContext.nodes

    return (
        <Layout>
            <Header />
            <Grid container spacing={4}>
                { nodes.map(node => props.path === '/' + node.parent.relativeDirectory && (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <Card raised>
                            <CardHeader title={node.frontmatter.title + '\nHi I am lectures'} />
                            <CardContent>
                                <Grid container spacing={1}>
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
                                <Link style={{ marginRight: "1rem" }} to={props.path === '/' ?  props.path + node.frontmatter.title : props.path + '/' + node.frontmatter.title}>
                                    Auf gehts!
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )}

export default Lectures
