import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardHeader,
    makeStyles,
} from '@material-ui/core'
import { Check } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useState } from 'react'

import { GatsbyProps, Lecture } from '../../model/model'
import AppLink from '../Shared/AppLink'

const useStyles = makeStyles(() => ({
    summaryContent: {
        justifyContent: 'space-between',
    },
    alert: {
        borderRadius: 'unset',
    },
}))

const CatalogTechnology = (props: GatsbyProps) => {
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
    const classes = useStyles()

    const [node] = props.pathContext.nodes
    const isStandalone = props.path.includes(node.frontmatter.title)
    const getLecturePath = (lecture: Lecture) =>
        isStandalone
            ? `${props.path}/${lecture.title}`
            : `${props.path}/${node.frontmatter.title}/${lecture.title}`

    const getChangeHandler = (lecture: Lecture, index: number) => ({
        expanded: isStandalone ? true : expandedAccordion === lecture.title + index,
        onChange: () => {
            if (lecture.title + index === expandedAccordion) setExpandedAccordion(null)
            else setExpandedAccordion(lecture.title + index)
        },
    })

    return (
        <Card variant="outlined">
            <CardHeader
                title={
                    <AppLink to={isStandalone ? undefined : node.frontmatter.title}>
                        {node.frontmatter.title}{' '}
                    </AppLink>
                }
            />
            <Alert color="success" className={classes.alert}>
                <AlertTitle>Lorem</AlertTitle>
                {node.frontmatter.description}
            </Alert>

            {node.frontmatter.lectures.map((lecture, index) => (
                <Accordion {...getChangeHandler(lecture, index)} key={lecture.title + index}>
                    <AccordionSummary classes={{ content: classes.summaryContent }}>
                        {lecture.title}
                        <Check color="secondary" />
                    </AccordionSummary>
                    <AccordionDetails>{lecture.description}</AccordionDetails>
                    <AccordionActions>
                        <AppLink to={getLecturePath(lecture)}>
                            <Button>jetzt starten</Button>
                        </AppLink>
                    </AccordionActions>
                </Accordion>
            ))}
        </Card>
    )
}

export default CatalogTechnology
