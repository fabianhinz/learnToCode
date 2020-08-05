import { Grid, Hidden } from '@material-ui/core'
import { CloudDownload, Launch } from '@material-ui/icons'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import FixedFab from '../Shared/FixedFab'
import Title from '../Shared/Title'
import Stackblitz from '../Stackblitz/Stackblitz'

const CatalogLecture = (props: GatsbyProps) => {
    const node = props.pathContext.nodes[0]
    const manual = <div dangerouslySetInnerHTML={{ __html: node.html }} />

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Title>{node.frontmatter.title}</Title>
                        </Grid>
                        {node.frontmatter.lastUpdate && (
                            <Grid item>
                                <Title>{node.frontmatter.lastUpdate}</Title>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    {manual}
                </Grid>
            </Grid>

            <Hidden xsDown implementation="css">
                <Stackblitz
                    manual={manual}
                    path={props.path}
                    onRenderButton={() => (
                        <FixedFab stackNumber={1} color="secondary" startIcon={<Launch />}>
                            Ausprobieren
                        </FixedFab>
                    )}
                />
            </Hidden>

            <FixedFab color="primary" startIcon={<CloudDownload />}>
                herunterladen
            </FixedFab>
        </>
    )
}

export default CatalogLecture
