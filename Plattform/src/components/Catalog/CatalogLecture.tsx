import { Grid, Typography } from '@material-ui/core'
import { CloudDownload, Launch } from '@material-ui/icons'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import FixedFab from '../Shared/FixedFab'
import Title from '../Shared/Title'

const CatalogLecture = (props: GatsbyProps) => {
    const node = props.pathContext.node

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Title>{node.frontmatter.title}</Title>
                </Grid>

                <Grid item xs={12}>
                    <div dangerouslySetInnerHTML={{ __html: node.html }} />
                </Grid>
            </Grid>

            <FixedFab stackNumber={1} color="primary" startIcon={<CloudDownload />}>
                Download
            </FixedFab>
            <FixedFab color="secondary" startIcon={<Launch />}>
                Ausprobieren
            </FixedFab>
        </>
    )
}

export default CatalogLecture
