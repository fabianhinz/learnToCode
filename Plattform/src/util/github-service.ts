import { GithubIssue } from '../model/model'
import { GITHUB_BASE_URI } from './constants'

export const createPrefilledIssue = ({
    assignees,
    body,
    labels,
    milestone,
    projects,
    template,
    title,
}: GithubIssue) => {
    const params = new URLSearchParams()
    if (assignees) params.set('assignees', assignees.join(','))
    if (body) params.set('body', body)
    if (labels) params.set('labels', labels.join(','))
    if (milestone) params.set('milestone', milestone)
    if (projects) params.set('projects', projects.join(','))
    if (template) params.set('template', template)
    if (title) params.set('title', title)

    return GITHUB_BASE_URI + 'issues/new?' + params.toString()
}
