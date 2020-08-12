import { IconButton } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import React from 'react'

import { GithubIssue } from '../../model/model'
import { createPrefilledIssue } from '../../util/github-service'

const IssueButton = (props: GithubIssue) => {
    return (
        <IconButton color="inherit" onClick={() => window.open(createPrefilledIssue({ ...props }))}>
            <HelpOutline />
        </IconButton>
    )
}

export default IssueButton
