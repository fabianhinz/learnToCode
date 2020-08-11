import { Grid } from '@material-ui/core'
import React from 'react'

import topicOrTechnologyImage from '../../../static/topicOrTechnology.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { GatsbyProps } from '../../model/model'
import Title from '../Shared/Title'
import TechnologyCard from '../Technology/TechnologyCard'

const CatalogTopic = (props: GatsbyProps) => {
    useBackgroundEffect(
        props.pathContext.node.frontmatter.iconPath?.publicURL || topicOrTechnologyImage
    )
    useNavTextEffect(props.pathContext.node.frontmatter.description)

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Title>Technologien</Title>
            </Grid>
            {props.pathContext.node.children.map(node => (
                <Grid item xs={12} lg={6} key={node.id}>
                    <TechnologyCard
                        node={node}
                        topicPathTitle={props.pathContext.node.frontmatter.pathTitle}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CatalogTopic
