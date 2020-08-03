import { Typography } from '@material-ui/core'
import { CloudDownload, Launch } from '@material-ui/icons'
import React from 'react'

import PageLayout from '../Layout/PageLayout'
import FixedFab from '../Shared/FixedFab'

interface Props {
    path: string
    pathContext: {
        nodes: {
            id: string
            frontmatter: {
                title: string
                shortDescription: string
                lectures: string
            }
            parent: {
                relativeDirectory: string
            }
            html: string
        }
    }
}

const CatalogLecture = (props: Props) => {
    const nodes = props.pathContext.nodes

    return (
        <PageLayout>
            <Typography variant="h5">{nodes.frontmatter.title}</Typography>

            <div dangerouslySetInnerHTML={{ __html: nodes.html }} />

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
