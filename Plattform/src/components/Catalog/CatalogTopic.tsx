import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { Check } from '@material-ui/icons'
import React, { useState } from 'react'

import { GatsbyProps } from '../../model/model'
import AppLink from '../Shared/AppLink'

const useStyles = makeStyles(() => ({
    summaryContent: {
        justifyContent: 'space-between',
    },
}))

const CatalogTopic = (props: GatsbyProps) => {
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
    const classes = useStyles()
    console.log(props.pathContext.nodes)

    return (
        <>
            <Grid container spacing={4}>
                {props.pathContext.nodes.map(node => (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <Card variant="outlined">
                            <CardHeader title={node.frontmatter.title} />
                            <Divider />
                            <CardContent>
                                <Typography color="textSecondary" variant="subtitle1">
                                    {node.frontmatter.description}
                                </Typography>
                            </CardContent>
                            <Divider />

                            {node.frontmatter.lectures.map((lecture, index) => (
                                <Accordion
                                    expanded={expandedAccordion === lecture.title + index}
                                    onChange={() => {
                                        if (lecture.title + index === expandedAccordion)
                                            setExpandedAccordion(null)
                                        else setExpandedAccordion(lecture.title + index)
                                    }}
                                    key={lecture.title + index}>
                                    <AccordionSummary classes={{ content: classes.summaryContent }}>
                                        {lecture.title}
                                        <Check color="secondary" />
                                    </AccordionSummary>
                                    <AccordionDetails>{lecture.description}</AccordionDetails>
                                    <AccordionActions>
                                        <AppLink
                                            to={
                                                props.path +
                                                '/' +
                                                node.frontmatter.title +
                                                '/' +
                                                lecture.title
                                            }>
                                            <Button>jetzt starten</Button>
                                        </AppLink>
                                    </AccordionActions>
                                </Accordion>
                            ))}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default CatalogTopic
