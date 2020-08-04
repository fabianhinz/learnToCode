import { Grid } from '@material-ui/core'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import CatalogTechnology from './CatalogTechnology'

const CatalogTopic = (props: GatsbyProps) => {
    return (
        <>
            <Grid container spacing={2}>
                {props.pathContext.nodes.map(node => (
                    <Grid item xs={12} md={6} xl={4} key={node.id}>
                        <CatalogTechnology path={props.path} pathContext={{ nodes: [node] }} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default CatalogTopic
