import { graphql, useStaticQuery } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'

import { Frontmatter, PathContextNode } from '../model/model'

type Results = Pick<Frontmatter, 'title' | 'description'> &
    Pick<PathContextNode, 'id'> & { relativeDirectory: string }

interface SearchResult {
    subheader: string
    results: Results[]
}

const getSubHeaderByRelDir = (relDir: string) => {
    if (relDir.length === 0) return 'Katalog'
    switch (relDir.split('/').length) {
        case 1:
            return 'Thema'
        case 2:
            return 'Technologie'
        case 3:
            return 'Lektion'
    }
}

const getSearchResults = (flexResults: Results[]): SearchResult[] => {
    const subheaders = new Set(flexResults.map(s => getSubHeaderByRelDir(s.relativeDirectory)))

    return Array.from(subheaders, subheader => ({
        subheader,
        results: flexResults.filter(s => getSubHeaderByRelDir(s.relativeDirectory) === subheader),
    }))
}

const useSearchQuery = (query: string) => {
    const { localSearchKatalog } = useStaticQuery(graphql`
        query MyQuery {
            localSearchKatalog {
                index
                store
            }
        }
    `)

    const flexResults = useFlexSearch(
        query,
        localSearchKatalog.index,
        JSON.parse(localSearchKatalog.store)
    ) as Results[]

    return { searchResults: getSearchResults(flexResults) }
}

export default useSearchQuery
