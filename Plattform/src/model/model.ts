export interface GatsbyProps {
    path: string
    pathContext: PathContext
}

export interface PathContext {
    node: PathContextNode
}

export interface PathContextNode {
    id: string
    frontmatter: Frontmatter
    parent: {
        relativeDirectory: string
    }
    children: PathContextNode[]
    html: string
}

export interface Frontmatter {
    pathTitle: string
    title: string
    description: string
    design: number
    iconPath?: {
        publicURL: string
    }
    lastUpdate?: string
}

export interface GithubIssue {
    repoUrl: string
    body?: string
    title?: string
    labels?: string[]
    template?: string
    milestone?: string
    assignees?: string[]
    projects?: string[]
}
