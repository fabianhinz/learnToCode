import { Grid } from '@material-ui/core'
import React from 'react'

import rootImage from '../../../static/root.png'
import useBackgroundEffect from '../../hooks/useBackgroundEffect'
import { GatsbyProps } from '../../model/model'
import { useFirebaseContext } from '../Provider/FirebaseProvider'
import Title from '../Shared/Title'
import Topic from '../Topic/Topic'
import UserLectures from '../User/UserLectures'

const CatalogRoot = (props: GatsbyProps) => {
    const { user } = useFirebaseContext()

    useBackgroundEffect(rootImage)

    return (
        <Grid container spacing={4}>
            {user && (
                <Grid item xs={12}>
                    <UserLectures />
                </Grid>
            )}

            <Grid item xs={12}>
                <Title>Katalog</Title>
            </Grid>

            {props.pathContext.node.children.map(node => (
                <Grid item xs={12} md={6} xl={4} key={node.id}>
                    <Topic node={node} />
                </Grid>
            ))}
        </Grid>
    )
}

export default CatalogRoot
