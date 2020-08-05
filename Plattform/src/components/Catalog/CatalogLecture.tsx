import { Divider, Typography } from '@material-ui/core'
import { CloudDownload, Launch } from '@material-ui/icons'
import React from 'react'

import { GatsbyProps } from '../../model/model'
import FixedFab from '../Shared/FixedFab'

const CatalogLecture = (props: GatsbyProps) => {
    const [node] = props.pathContext.nodes

    return (
        <>
            <Typography gutterBottom variant="h4" align="center">
                {node.frontmatter.title}
            </Typography>
            <Divider />

            <div dangerouslySetInnerHTML={{ __html: node.html }} />

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
