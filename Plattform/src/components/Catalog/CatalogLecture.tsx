import { Grid } from '@material-ui/core'
import React, { useState } from 'react'

import lectureImage from '../../../static/lecture.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { LectureFrontmatter, NodeContext, ParentNode } from '../../model/model'
import { createPrefilledIssue } from '../../util/github-service'
import LectureSpeedDial, { SpeedDialParentAction } from '../Lecture/LectureSpeedDial'
import Title from '../Shared/Title'
import Stackblitz from '../Stackblitz/Stackblitz'
import CatalogErrorBoundary from './CatalogErrorBoundary'

export interface LectureNodeProps {
    id: string
    frontmatter: LectureFrontmatter
    parent: ParentNode
    html: string
}

const CatalogLecture = (props: NodeContext<LectureNodeProps>) => {
    const [stackblitzOpen, setStackblitzOpen] = useState(false)

    useBackgroundEffect(props.pathContext.node.frontmatter.iconPath?.publicURL || lectureImage)
    useNavTextEffect(props.pathContext.node.frontmatter.description)

    const {
        frontmatter: { title, lastUpdate },
        html,
    } = props.pathContext.node

    const handleSpeedDialAction = (action: SpeedDialParentAction) => {
        switch (action) {
            case 'downloadLecture': {
                window.open(
                    `https://github.com/fabianhinz/learnToCode/raw/master/Lektionen${props.path}/lecture.zip`
                )
                break
            }
            case 'openStackblitz': {
                setStackblitzOpen(true)
                break
            }
            case 'openGithubIssue': {
                window.open(
                    createPrefilledIssue({
                        title: window.location.pathname + ', Version: ' + __VERSION__,
                        labels: ['help wanted'],
                        assignees: ['fabianhinz'],
                        template: 'lecture_help_template.md',
                    })
                )
                break
            }
        }
    }

    return (
        <CatalogErrorBoundary componentName="CatalogLecture">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Title>{title}</Title>
                        </Grid>
                        {lastUpdate && (
                            <Grid item>
                                <Title>{lastUpdate}</Title>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </Grid>
            </Grid>

            <LectureSpeedDial onActionClick={handleSpeedDialAction} />

            <Stackblitz
                path={props.path}
                node={props.pathContext.node}
                open={stackblitzOpen}
                onClose={() => setStackblitzOpen(false)}
            />
        </CatalogErrorBoundary>
    )
}

export default CatalogLecture
