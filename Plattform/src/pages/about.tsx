import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import aboutImage from '../../static/about.png'
import Doc from '../components/Doc/Doc'
import { useBackgroundEffect } from '../hooks/useBackgroundEffect'
import { DocQueryResult } from '../model/model'

const About = () => {
    useBackgroundEffect(aboutImage)

    const { allMarkdownRemark }: DocQueryResult = useStaticQuery(graphql`
        query docAboutQuery {
            allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(about)/" } }) {
                nodes {
                    id
                    html
                    parent {
                        ... on File {
                            name
                        }
                    }
                }
            }
        }
    `)

    return <Doc nodes={allMarkdownRemark.nodes} />
}

export default About
