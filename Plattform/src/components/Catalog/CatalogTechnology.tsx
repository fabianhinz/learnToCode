import { Grid } from '@material-ui/core'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import Progress from '../Shared/Progress'
import Separator from '../Shared/Separator'
import Title from '../Shared/Title'
import TechnologyAccordion from '../Technology/TechnologyAccordion'
import TechnologyCard, { TechnologyCardProps } from '../Technology/TechnologyCard'

const CatalogTechnology = (props: GatsbyProps) => {
    const node = props.pathContext.node
    const isStandalone = props.path.includes(node.frontmatter.pathTitle)
    const sharedCardProps: TechnologyCardProps = {
        isStandalone,
        pathTitle: node.frontmatter.pathTitle,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        iconUrl: node.frontmatter.iconPath?.publicURL,
    }

    if (!isStandalone) return <TechnologyCard {...sharedCardProps} lectures={node.children} />

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Grid container spacing={2} justify="space-between" alignItems="center">
                    <Grid item>
                        <Title>Lektionen</Title>
                    </Grid>
                    <Grid item>
                        <Progress value={100} height={25} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TechnologyCard {...sharedCardProps} />
            </Grid>
            <Grid item xs={12}>
                <Separator disableMargin />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {node.children.map((lecture, index) => (
                        <Grid item xs={12} lg={6} key={lecture.frontmatter.pathTitle + index}>
                            <TechnologyAccordion
                                expanded
                                isStandalone={isStandalone}
                                pathTitle={node.frontmatter.pathTitle}
                                title={node.frontmatter.title}
                                lecture={lecture}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CatalogTechnology
