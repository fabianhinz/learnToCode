import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import faqImage from '../../static/faq.png'
import Doc from '../components/Doc/Doc'
import useBackgroundEffect from '../hooks/useBackgroundEffect'
import { DocQueryResult } from '../model/model'

const Faq = () => {
    useBackgroundEffect(faqImage)

    const { allMarkdownRemark }: DocQueryResult = useStaticQuery(graphql`
        query docFaqQuery {
            allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(faq)/" } }) {
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

export default Faq
