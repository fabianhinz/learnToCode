import { Grid, List } from '@material-ui/core'
import React from 'react'

import topicOrTechnologyImage from '../../../static/topicOrTechnology.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { NodeContext, ParentNode, TechnologyFrontmatter } from '../../model/model'
import LectureListItem from '../Lecture/LectureListItem'
import ActionCard from '../Shared/ActionCard'
import Title from '../Shared/Title'
import CatalogErrorBoundary from './CatalogErrorBoundary'
import { LectureNodeProps } from './CatalogLecture'

export interface TechnologyNodeProps {
    id: string
    frontmatter: TechnologyFrontmatter
    parent: ParentNode
    children: LectureNodeProps[]
}

const CatalogTechnology = (props: NodeContext<TechnologyNodeProps>) => {
    useBackgroundEffect(
        props.pathContext.node.frontmatter.iconPath?.publicURL || topicOrTechnologyImage
    )
    useNavTextEffect(props.pathContext.node.frontmatter.description)

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2} justify="space-between" alignItems="center">
                        <Grid item>
                            <Title>Lektionen</Title>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <ActionCard disableActionArea>
                        <List disablePadding>
                            {props.pathContext.node.children.map((node, index) => (
                                <CatalogErrorBoundary key={node.id} componentName="LectureListItem">
                                    <LectureListItem
                                        node={node}
                                        withDivider={
                                            index !== props.pathContext.node.children.length - 1
                                        }
                                    />
                                </CatalogErrorBoundary>
                            ))}
                        </List>
                    </ActionCard>
                </Grid>
            </Grid>
        </>
    )
}

export default CatalogTechnology
