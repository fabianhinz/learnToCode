export interface NodeContext<N> {
    path: string
    pathContext: PathContext<N>
}

export interface PathContext<N> {
    node: N
}

export interface BaseFrontmatter {
    pathTitle: string
    title: string
    description: string
    iconPath?: IconPath
}

export interface IconPath {
    publicURL: string
}

export interface TopicFrontmatter extends BaseFrontmatter {
    design: string
}

export interface TechnologyFrontmatter extends BaseFrontmatter {
    design: string
}

export interface LectureFrontmatter extends BaseFrontmatter {
    lastUpdate?: string
}

export interface ParentNode {
    relativeDirectory: string
}

export interface GithubIssue {
    body?: string
    title?: string
    labels?: string[]
    template?: string
    milestone?: string
    assignees?: string[]
    projects?: string[]
}

export interface CatalogBase {
    topic: string
    technology: string
    lecture: string
}
