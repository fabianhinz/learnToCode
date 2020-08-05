import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionProps,
    AccordionSummary,
    Button,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { CheckCircle } from '@material-ui/icons'
import { useLocation } from '@reach/router'
import React from 'react'

import { Frontmatter, Lecture } from '../../model/model'
import AppLink from '../Shared/AppLink'

const useStyles = makeStyles(() => ({
    summaryContent: {
        justifyContent: 'space-between',
    },
    checkIcon: {
        color: green[500],
    },
}))

interface Props extends Pick<Frontmatter, 'title'>, Pick<AccordionProps, 'expanded' | 'onChange'> {
    lecture: Lecture
    isStandalone: boolean
}

const TechnologyAccordion = ({ lecture, isStandalone, title, ...accordionProps }: Props) => {
    const classes = useStyles()
    const { pathname } = useLocation()

    const path = isStandalone
        ? `${pathname}/${lecture.title}`
        : `${pathname}/${title}/${lecture.title}`

    return (
        <Accordion {...accordionProps}>
            <AccordionSummary classes={{ content: classes.summaryContent }}>
                <Typography variant="h6">{lecture.title}</Typography>
                <CheckCircle className={classes.checkIcon} />
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="subtitle1">{lecture.description}</Typography>
            </AccordionDetails>
            <AccordionActions>
                <AppLink to={path}>
                    <Button>jetzt starten</Button>
                </AppLink>
            </AccordionActions>
        </Accordion>
    )
}

export default TechnologyAccordion
