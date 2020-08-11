import { Grid } from '@material-ui/core'
import React from 'react'

import UserInfos from '../User/Userinfos'

interface Props {
    total: number
    done: number
    inProgress: number
}

const TechnologyInfos = ({ total, inProgress, done }: Props) => (
    <Grid container spacing={1}>
        <Grid item>
            <UserInfos.Total value={total} />
        </Grid>
        <Grid item>
            <UserInfos.InProgress value={inProgress} />
        </Grid>
        <Grid item>
            <UserInfos.Done value={done} />
        </Grid>
    </Grid>
)

export default TechnologyInfos
