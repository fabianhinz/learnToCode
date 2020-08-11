import { Avatar, CardHeader, makeStyles, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { navigate } from 'gatsby'
import React from 'react'

import { PathContextNode } from '../../model/model'
import { useProgressContext } from '../Provider/ProgressProvider'
import ActionCard from '../Shared/ActionCard'
import TechnologyInfos from './TechnologyInfos'

const useStyles = makeStyles(() => ({
    alert: {
        borderRadius: 'unset',
    },
}))

interface Props {
    node: PathContextNode
    topicPathTitle: string
}

const TechnologyCard = ({ node, topicPathTitle }: Props) => {
    const { progressByTechnology } = useProgressContext()

    const classes = useStyles()

    const {
        frontmatter: { pathTitle, title, iconPath, description },
        children,
    } = node

    return (
        <ActionCard onClick={() => navigate(pathTitle)}>
            <CardHeader
                avatar={
                    <Avatar variant="square" src={iconPath?.publicURL}>
                        {title.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <TechnologyInfos
                        total={children.length}
                        {...progressByTechnology.get(`/${topicPathTitle}/${pathTitle}`)}
                    />
                }
                title={<Typography variant="h5">{title}</Typography>}
            />
            <Alert color="info" className={classes.alert}>
                <AlertTitle>Lorem</AlertTitle>
                {description}
            </Alert>
        </ActionCard>
    )
}
export default TechnologyCard
