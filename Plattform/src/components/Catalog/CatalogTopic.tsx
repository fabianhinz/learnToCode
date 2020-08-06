import { Grid } from '@material-ui/core'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import Title from '../Shared/Title'
import CatalogTechnology from './CatalogTechnology'

const CatalogTopic = (props: GatsbyProps) => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Title>Technologien</Title>
            </Grid>
            {props.pathContext.node.children.map(node => (
                <Grid item xs={12} lg={6} key={node.id}>
                    <CatalogTechnology path={props.path} pathContext={{ node }} />
                </Grid>
            ))}
        </Grid>
    )
}

export default CatalogTopic
