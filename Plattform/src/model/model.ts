export interface GatsbyProps {
    path: string
    pathContext: PathContext
}

export interface PathContext {
    nodes: PathContextNode[]
}

export interface PathContextNode {
    id: string
    frontmatter: Frontmatter
    parent: {
        relativeDirectory: string
    }
    html: string
}

export interface Frontmatter {
    title: string
    description: string
    technologies: string[]
    design: number
    iconPath?: {
        publicURL: string
    }
    lectures: Lecture[]
    lastUpdate?: string
}

export interface Lecture {
    title: string
    description: string
}
