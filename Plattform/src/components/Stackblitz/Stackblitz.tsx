import { Button, Hidden } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import React from 'react'

import { relativeDir2CatalogBase } from '../../util/mapper'
import { LectureNodeProps } from '../Catalog/CatalogLecture'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import { useProgressContext } from '../Provider/ProgressProvider'
import LectureSandbox from '../Shared/LectureSandbox'
import StackblitzContainer from './StackblitzContainer'

export interface StackblitzProps {
    path: string
    node: LectureNodeProps
    open: boolean
    onClose: () => void
}

const Stackblitz = ({ path, node, open, onClose }: StackblitzProps) => {
    const { firebaseInstance, isLoggedIn } = useFirebaseContext()
    const { onProgressChange, progressByRelDir } = useProgressContext()

    const prevProgress = progressByRelDir.get(node.parent.relativeDirectory)

    const handleResolveLecture = () => {
        const { topic, technology, lecture } = relativeDir2CatalogBase(
            node.parent.relativeDirectory
        )

        onProgressChange({
            topic,
            technology,
            lecture,
            status: !prevProgress
                ? 'inProgress'
                : prevProgress.status === 'inProgress'
                ? 'done'
                : 'inProgress',
            lastTimeWorkedOn: firebaseInstance.firestore.Timestamp.fromDate(new Date()),
            documentId: prevProgress?.documentId,
        })
    }

    return (
        <Hidden xsDown implementation="css">
            <LectureSandbox
                open={open}
                onClose={onClose}
                title="StackBlitz"
                onRenderManual={() => (
                    <>
                        {isLoggedIn && (
                            <Button
                                fullWidth
                                onClick={handleResolveLecture}
                                startIcon={<CheckCircle />}>
                                lektion{' '}
                                {!prevProgress || prevProgress.status === 'done'
                                    ? 'starten'
                                    : 'abschließen'}
                            </Button>
                        )}

                        <div dangerouslySetInnerHTML={{ __html: node.html }} />
                    </>
                )}>
                <StackblitzContainer
                    open={open}
                    path={path}
                    relDir={node.parent.relativeDirectory}
                />
            </LectureSandbox>
        </Hidden>
    )
}

export default Stackblitz
