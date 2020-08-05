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

import { GatsbyProps } from '../../model/model'
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

    const node = props.pathContext.node
    const isStandalone = props.path.includes(node.frontmatter.pathTitle)
    const getLecturePath = (lecture: string) =>
        isStandalone
            ? `${props.path}/${lecture}`
            : `${props.path}/${node.frontmatter.pathTitle}/${lecture}`

    const getChangeHandler = (lecture: string, index: number) => ({
        expanded: isStandalone ? true : expandedAccordion === lecture + index,
        onChange: () => {
            if (lecture + index === expandedAccordion) setExpandedAccordion(null)
            else setExpandedAccordion(lecture + index)
        },
    })

    return (
        <Card variant="outlined">
            <CardHeader
                title={
                    <AppLink to={isStandalone ? undefined : node.frontmatter.pathTitle}>
                        {node.frontmatter.title}{' '}
                    </AppLink>
                }
            />
            <Alert color="success" className={classes.alert}>
                <AlertTitle>Lorem</AlertTitle>
                {node.frontmatter.description}
            </Alert>

            {node.children.map((lecture, index) => (
                <Accordion
                    {...getChangeHandler(lecture.frontmatter.pathTitle, index)}
                    key={lecture.frontmatter.pathTitle + index}>
                    <AccordionSummary classes={{ content: classes.summaryContent }}>
                        {lecture.frontmatter.title}
                        <Check color="secondary" />
                    </AccordionSummary>
                    <AccordionDetails>{lecture.frontmatter.description}</AccordionDetails>
                    <AccordionActions>
                        <AppLink to={getLecturePath(lecture.frontmatter.pathTitle)}>
                            <Button>jetzt starten</Button>
                        </AppLink>
                    </AccordionActions>
                </Accordion>
            ))}
        </Card>
    )
}

export default CatalogTechnology
