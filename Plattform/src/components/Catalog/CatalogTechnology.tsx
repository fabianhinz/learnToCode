import { Grid, List } from '@material-ui/core'
import React from 'react'

import topicOrTechnologyImage from '../../../static/topicOrTechnology.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { GatsbyProps } from '../../model/model'
import LectureListItem from '../Lecture/LectureListItem'
import ActionCard from '../Shared/ActionCard'
import Title from '../Shared/Title'

const CatalogTechnology = (props: GatsbyProps) => {
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
                                <LectureListItem
                                    key={node.id}
                                    node={node}
                                    withDivider={
                                        index !== props.pathContext.node.children.length - 1
                                    }
                                />
                            ))}
                        </List>
                    </ActionCard>
                </Grid>
            </Grid>
        </>
    )
}

export default CatalogTechnology
