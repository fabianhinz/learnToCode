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

export interface TechnologyFrontmatter extends BaseFrontmatter {
    priorKnowledge?: string[]
}

export interface LectureFrontmatter extends BaseFrontmatter {
    lastUpdate?: string
    logicalOrder: number
}

export interface ParentNode {
    relativeDirectory: string
}

export interface GithubIssue {
    body?: string
    title?: string
    // todo typisieren
    labels?: string[]
    template?:
        | 'general_bug_template.md'
        | 'improvement_template.md'
        | 'lecture_help_template.md'
        | 'lecture_idea_template.md'
    milestone?: string
    assignees?: string[]
    projects?: string[]
}

export interface CatalogBase {
    topic: string
    technology: string
    lecture: string
}

export interface DocNode {
    id: string
    html: string
    parent: { name: string }
}

export interface DocQueryResult {
    allMarkdownRemark: {
        nodes: DocNode[]
    }
}

export interface StackblitzFiles {
    'package-lock.json': string
}
