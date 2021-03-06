import { Grid } from '@material-ui/core'
import React from 'react'

import topicOrTechnologyImage from '../../../static/topicOrTechnology.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { BaseFrontmatter, NodeContext, ParentNode } from '../../model/model'
import Title from '../Shared/Title'
import TechnologyCard from '../Technology/TechnologyCard'
import CatalogErrorBoundary from './CatalogErrorBoundary'
import { TechnologyNodeProps } from './CatalogTechnology'

export interface TopicNodeProps {
    id: string
    frontmatter: BaseFrontmatter
    parent: ParentNode
    children: TechnologyNodeProps[]
}

const CatalogTopic = (props: NodeContext<TopicNodeProps>) => {
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
                    <CatalogErrorBoundary componentName="TechnologyCard">
                        <TechnologyCard
                            node={node}
                            topicPathTitle={props.pathContext.node.frontmatter.pathTitle}
                        />
                    </CatalogErrorBoundary>
                </Grid>
            ))}
        </Grid>
    )
}

export default CatalogTopic
