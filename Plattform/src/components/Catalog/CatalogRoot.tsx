import { Grid } from '@material-ui/core'
import React from 'react'

import rootImage from '../../../static/root.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import { NodeContext } from '../../model/model'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import Title from '../Shared/Title'
import Topic from '../Topic/Topic'
import UserLectures from '../User/UserLectures'
import CatalogErrorBoundary from './CatalogErrorBoundary'
import { TopicNodeProps } from './CatalogTopic'

export interface RootNodeProps {
    children: TopicNodeProps[]
}

const CatalogRoot = (props: NodeContext<RootNodeProps>) => {
    const { isLoggedIn } = useFirebaseContext()

    useBackgroundEffect(rootImage)

    return (
        <Grid container spacing={4}>
            {isLoggedIn && (
                <Grid item xs={12}>
                    <UserLectures />
                </Grid>
            )}

            <Grid item xs={12}>
                <Title>Katalog</Title>
            </Grid>

            {props.pathContext.node.children.map(node => (
                <Grid item xs={12} md={6} xl={4} key={node.id}>
                    <CatalogErrorBoundary componentName="Topic">
                        <Topic node={node} />
                    </CatalogErrorBoundary>
                </Grid>
            ))}
        </Grid>
    )
}

export default CatalogRoot
