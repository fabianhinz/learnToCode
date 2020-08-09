import { graphql, useStaticQuery } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'

import { Frontmatter, PathContextNode } from '../model/model'

export type Result = Pick<Frontmatter, 'title' | 'description' | 'pathTitle'> &
    Pick<PathContextNode, 'id'> & { relativeDirectory: string }

interface SearchResult {
    subheader: 'Katalog' | 'Lektion' | 'Thema'
    results: Result[]
}

const getSubHeaderByRelDir = (relDir: string) => {
    if (relDir.length === 0) return 'Katalog'
    switch (relDir.split('/').length) {
        case 1:
            return 'Thema'
        case 3:
            return 'Lektion'
    }
}

const getSearchResults = (flexResults: Result[]): SearchResult[] => {
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
    ) as Result[]

    return { searchResults: getSearchResults(flexResults) }
}

export default useSearchQuery
