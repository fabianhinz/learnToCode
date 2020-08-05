import { Avatar, Card, CardHeader, makeStyles } from '@material-ui/core'
import { School } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useState } from 'react'

import { Frontmatter, Lecture } from '../../model/model'
import AppLink from '../Shared/AppLink'
import TechnologyAccordion from './TechnologyAccordion'

const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: theme.shadows[4],
    },
    alert: {
        borderRadius: 'unset',
    },
}))

export type TechnologyCardProps = Props

interface Props extends Pick<Frontmatter, 'title' | 'description'> {
    isStandalone: boolean
    iconUrl?: string
    lectures?: Lecture[]
}

const TechnologyCard = ({ lectures, title, description, iconUrl, isStandalone }: Props) => {
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
    const classes = useStyles()

    const getChangeHandler = (lecture: Lecture, index: number) => ({
        expanded: isStandalone ? true : expandedAccordion === lecture.title + index,
        onChange: () => {
            if (isStandalone) return

            if (lecture.title + index === expandedAccordion) setExpandedAccordion(null)
            else setExpandedAccordion(lecture.title + index)
        },
    })

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar src={iconUrl}>{title.slice(0, 1)}</Avatar>}
                title={
                    <AppLink variant="h5" to={!lectures ? undefined : title}>
                        {title}
                    </AppLink>
                }
            />
            <Alert icon={<School />} color="info" className={classes.alert}>
                <AlertTitle>Lorem</AlertTitle>
                {description}
            </Alert>

            {lectures?.map((lecture, index) => (
                <TechnologyAccordion
                    {...getChangeHandler(lecture, index)}
                    key={lecture.title + index}
                    isStandalone={isStandalone}
                    title={title}
                    lecture={lecture}
                />
            ))}
        </Card>
    )
}

export default TechnologyCard
