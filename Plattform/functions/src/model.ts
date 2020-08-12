// ? this is actually the relative Directory in the frontend
export type Lecture = string

export interface CatalogBase {
    topic: string
    technology: string
    lecture: string
}

export interface UserRatingDoc extends CatalogBase {
    value: number | null
}

export interface CommunityRatingDoc extends CatalogBase {
    average: number
    votes: number
}
