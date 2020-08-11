import { IconButton } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import React from 'react'

import { GithubIssue } from '../../model/model'
import { createPrefilledIssue } from '../../util/github-service'

const IssueButton = (props: GithubIssue) => {
    const handleButtonClick = () => {
        const url = createPrefilledIssue({ ...props })
        window.open(url)
    }

    return (
        <IconButton color="inherit" onClick={handleButtonClick}>
            <HelpOutline />
        </IconButton>
    )
}

export default IssueButton
