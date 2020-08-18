import { Grid, Typography } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import faqImage from '../../static/faq.png'
import useBackgroundEffect from '../hooks/useBackgroundEffect'
import { DocQueryResult } from '../model/model'

// ? ToDo tbd
const Faq = () => {
    useBackgroundEffect(faqImage)

    const { allMarkdownRemark }: DocQueryResult<null> = useStaticQuery(graphql`
        query docFaqQuery {
            allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(faq)/" } }) {
                nodes {
                    id
                    html
                }
            }
        }
    `)

    return (
        <Grid container spacing={4} direction="column">
            {allMarkdownRemark.nodes.map(node => (
                <Grid key={node.id} item>
                    <Typography>
                        <span dangerouslySetInnerHTML={{ __html: node.html }}></span>
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default Faq
