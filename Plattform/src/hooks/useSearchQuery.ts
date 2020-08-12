import { graphql, useStaticQuery } from 'gatsby'
import { useEffect, useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'

import { TopicNodeProps } from '../components/Catalog/CatalogTopic'
import { BaseFrontmatter } from '../model/model'

export type Result = Pick<BaseFrontmatter, 'title' | 'description' | 'pathTitle'> &
    Pick<TopicNodeProps, 'id'> & { relativeDirectory: string }

type Subheader = 'Thema' | 'Technologie' | 'Lektion'

const SUBHEADERS: [Subheader, Subheader, Subheader] = ['Thema', 'Technologie', 'Lektion']

interface SearchResult {
    subheader: Subheader
    results: Result[]
}

const getSubHeaderByRelDir = (relDir: string) => {
    if (relDir.length === 0) return 'Thema'
    switch (relDir.split('/').length) {
        case 1:
            return 'Technologie'
        case 3:
            return 'Lektion'
    }
}

const getSearchResults = (flexResults: Result[]): SearchResult[] =>
    SUBHEADERS.map(subheader => ({
        subheader,
        results: flexResults.filter(s => getSubHeaderByRelDir(s.relativeDirectory) === subheader),
    })).filter(r => r.results.length > 0)

const useSearchQuery = (query: string) => {
    const [debouncedQuery, setDebouncedQuery] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedQuery(query), 250)

        return () => {
            clearTimeout(timeout)
        }
    }, [query])

    const { localSearchKatalog } = useStaticQuery(graphql`
        query MyQuery {
            localSearchKatalog {
                index
                store
            }
        }
    `)

    const flexResults = useFlexSearch(
        debouncedQuery,
        localSearchKatalog.index,
        JSON.parse(localSearchKatalog.store)
    ) as Result[]

    return { searchResults: getSearchResults(flexResults) }
}

export default useSearchQuery
