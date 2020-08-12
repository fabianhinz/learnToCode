import { CatalogBase } from '../model/model'

export const relativeDir2CatalogBase = (relativeDir: string): CatalogBase => {
    const [topic, technology, lecture] = relativeDir.split('/')
    return {
        topic,
        technology,
        lecture,
    }
}

export const catalogBase2RelativeDir = ({ topic, technology, lecture }: CatalogBase): string =>
    `${topic}/${technology}/${lecture}`
