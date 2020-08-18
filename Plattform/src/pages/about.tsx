import { Grid, Typography } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import aboutImage from '../../static/about.png'
import Title from '../components/Shared/Title'
import { useBackgroundEffect } from '../hooks/useBackgroundEffect'
import { DocQueryResult } from '../model/model'

const About = () => {
    useBackgroundEffect(aboutImage)

    const { allMarkdownRemark }: DocQueryResult<{ title: string }> = useStaticQuery(graphql`
        query docAboutQuery {
            allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(about)/" } }) {
                nodes {
                    id
                    html
                    frontmatter {
                        title
                    }
                }
            }
        }
    `)

    return (
        <Grid container spacing={4} direction="column">
            {allMarkdownRemark.nodes.map(node => (
                <Grid key={node.id} item>
                    <Title>{node.frontmatter.title}</Title>
                    <Typography>
                        <span dangerouslySetInnerHTML={{ __html: node.html }}></span>
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default About
