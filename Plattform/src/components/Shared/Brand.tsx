import { TypographyProps, WithStyles, withStyles } from '@material-ui/core'
import React from 'react'

import AppLink from './AppLink'

type Props = WithStyles & Pick<TypographyProps, 'variant'>

export default withStyles(theme => ({
    platform: {
        marginRight: theme.spacing(0.5),
        padding: theme.spacing(0.5),
        border: `2px solid ${theme.palette.text.primary}`,
    },
}))(function Brand(props: Props) {
    return (
        <AppLink to="/" color="textPrimary" variant={props.variant}>
            <span className={props.classes.platform}>learn2Code</span>HsKA
        </AppLink>
    )
})
