import { Chip, Grid, List } from '@material-ui/core'
import { Check } from '@material-ui/icons'
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
    const {
        pathContext: {
            node: { frontmatter, children },
        },
    } = props

    useBackgroundEffect(frontmatter.iconPath?.publicURL || topicOrTechnologyImage)
    useNavTextEffect(frontmatter.description)

    return (
        <>
            <Grid container spacing={4}>
                {frontmatter.priorKnowledge && (
                    <>
                        <Grid item xs={12}>
                            <Title>Empfohlene Kenntnisse</Title>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                {frontmatter.priorKnowledge.map((prior, index) => (
                                    <Grid item key={index}>
                                        <Chip label={prior} icon={<Check />} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </>
                )}

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
                            {children.map((node, index) => (
                                <CatalogErrorBoundary key={node.id} componentName="LectureListItem">
                                    <LectureListItem
                                        node={node}
                                        withDivider={index !== children.length - 1}
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
