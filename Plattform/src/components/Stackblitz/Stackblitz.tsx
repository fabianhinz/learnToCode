import StackBlitzSDK from '@stackblitz/sdk'
import React, { useEffect } from 'react'

import LectureSandbox from '../Shared/LectureSandbox'

const StackblitzContainer = ({ path }: Pick<Props, 'path'>) => {
    useEffect(() => {
        StackBlitzSDK.embedGithubProject(path, 'fabianhinz/learnToCode/tree/master/dummy', {
            width: '100%',
            height: '100%',
        })
    }, [path])

    return <div id={path} />
}

interface Props {
    manual: JSX.Element
    path: string
    onRenderButton: () => JSX.Element
}

const Stackblitz = ({ manual, path, onRenderButton }: Props) => {
    return (
        <LectureSandbox
            title="StackBlitz"
            onRenderButton={onRenderButton}
            onRenderManual={() => manual}>
            {uiReady => uiReady && <StackblitzContainer path={path} />}
        </LectureSandbox>
    )
}

export default Stackblitz
