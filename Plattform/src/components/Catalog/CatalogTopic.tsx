import { Avatar, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { navigate } from 'gatsby'
import React from 'react'

import topicOrTechnologyImage from '../../../static/topicOrTechnology.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import useNavTextEffect from '../../hooks/useNavTextEffect'
import { GatsbyProps } from '../../model/model'
import { useProgressContext } from '../Provider/ProgressProvider'
import ActionCard from '../Shared/ActionCard'
import Title from '../Shared/Title'
import UserInfos from '../User/Userinfos'

const useStyles = makeStyles(() => ({
    alert: {
        borderRadius: 'unset',
    },
}))

interface LectureInfosProps {
    total: number
    done: number
    inProgress: number
}

const LectureInfos = ({ total, inProgress, done }: LectureInfosProps) => (
    <Grid container spacing={1}>
        <Grid item>
            <UserInfos.Total value={total} />
        </Grid>
        <Grid item>
            <UserInfos.InProgress value={inProgress} />
        </Grid>
        <Grid item>
            <UserInfos.Done value={done} />
        </Grid>
    </Grid>
)

const CatalogTopic = (props: GatsbyProps) => {
    const { progressByTechnology } = useProgressContext()

    const classes = useStyles()

    useBackgroundEffect(
        props.pathContext.node.frontmatter.iconPath?.publicURL || topicOrTechnologyImage
    )
    useNavTextEffect(props.pathContext.node.frontmatter.description)

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Title>Technologien</Title>
            </Grid>
            {props.pathContext.node.children.map(
                ({ frontmatter: { pathTitle, title, iconPath, description }, children, id }) => (
                    <Grid item xs={12} lg={6} key={id}>
                        <ActionCard onClick={() => navigate(pathTitle)}>
                            <CardHeader
                                avatar={
                                    <Avatar variant="square" src={iconPath?.publicURL}>
                                        {title.slice(0, 1)}
                                    </Avatar>
                                }
                                action={
                                    <LectureInfos
                                        total={children.length}
                                        {...progressByTechnology.get(
                                            `/${props.pathContext.node.frontmatter.pathTitle}/${pathTitle}`
                                        )}
                                    />
                                }
                                title={<Typography variant="h5">{title}</Typography>}
                            />
                            <Alert color="info" className={classes.alert}>
                                <AlertTitle>Lorem</AlertTitle>
                                {description}
                            </Alert>
                        </ActionCard>
                    </Grid>
                )
            )}
        </Grid>
    )
}

export default CatalogTopic
