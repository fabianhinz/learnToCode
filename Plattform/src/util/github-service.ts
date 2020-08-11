import { GithubIssue } from '../model/model'

export const createPrefilledIssue = ({
    repoUrl,
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

    return repoUrl + '/issues/new?' + params.toString()
}
