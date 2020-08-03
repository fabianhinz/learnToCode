import { Typography } from '@material-ui/core'
import { CloudDownload, Launch } from '@material-ui/icons'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import PageLayout from '../Layout/PageLayout'
import FixedFab from '../Shared/FixedFab'

const CatalogLecture = (props: GatsbyProps) => {
    const node = props.pathContext.nodes[0]
    console.log(props.pathContext.nodes)

    return (
        <PageLayout>
            <Typography variant="h5">{node.frontmatter.title}</Typography>

            <div dangerouslySetInnerHTML={{ __html: node.html }} />

            <FixedFab stackNumber={1} color="primary" startIcon={<CloudDownload />}>
                Download
            </FixedFab>
            <FixedFab color="secondary" startIcon={<Launch />}>
                Ausprobieren
            </FixedFab>
        </PageLayout>
    )
}

export default CatalogLecture
