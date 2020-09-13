/**
 * Creates pages and routes for each markdown file in the Katalog-Directory.
 * The routes are similar to the unterlying file structure.
 */

const path = require('path')
const { PATH_LEVELS } = require('./node-apis-constants')

exports.createMarkdownPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    /**
     * only fields that are defined in the query below are available in the components frontmatter object
     * new fields under the object require a restart of the dev-server
     */
    const result = await graphql(`
        query {
            allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(Katalog)/" } }) {
                nodes {
                    id
                    fileAbsolutePath
                    frontmatter {
                        pathTitle
                        title
                        description
                        priorKnowledge
                        iconPath {
                            publicURL
                        }
                        lastUpdate
                        logicalOrder
                        onlineIDE
                    }
                    parent {
                        ... on File {
                            relativeDirectory
                        }
                    }
                    html
                }
            }
        }
    `)

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const COMPONENTS_ROOT = 'src/components/'
    const CATALOG_ROOT = COMPONENTS_ROOT + 'Catalog/'

    const RootComponent = path.resolve(CATALOG_ROOT + 'CatalogRoot.tsx')
    const TopicComponent = path.resolve(CATALOG_ROOT + 'CatalogTopic.tsx')
    const TechnologyComponent = path.resolve(CATALOG_ROOT + 'CatalogTechnology.tsx')
    const LectureComponent = path.resolve(CATALOG_ROOT + 'CatalogLecture.tsx')
    const AccountComponent = path.resolve(COMPONENTS_ROOT + 'User/User.tsx')

    const topicNodes = []
    const technologyNodes = []
    const lectureNodes = []

    result.data.allMarkdownRemark.nodes.forEach(node => {
        const relDir = node.parent.relativeDirectory
        const pathLevel = !relDir ? 0 : relDir.split('/').length
        switch (pathLevel) {
            case PATH_LEVELS.topic:
                topicNodes.push(node)
                break
            case PATH_LEVELS.technology:
                technologyNodes.push(node)
                break
            case PATH_LEVELS.lecture:
                lectureNodes.push(node)
                break
            default:
                break
        }
    })

    const sortNodes = nodes =>
        nodes.sort((a, b) =>
            a.frontmatter.title.toLowerCase().localeCompare(b.frontmatter.title.toLowerCase())
        )

    sortNodes(topicNodes)
    sortNodes(technologyNodes)
    sortNodes(lectureNodes)

    const createSpecificPage = (path, component, node) => {
        if (!path) return
        createPage({
            path,
            component,
            context: {
                node,
            },
        })
    }

    // create root page to display topics
    createSpecificPage('/', RootComponent, { children: topicNodes })

    // account page should know about the catalog
    createSpecificPage('/account', AccountComponent, { children: topicNodes })

    // create topic pages to display relating technologies
    topicNodes.forEach(topicNode => {
        topicNode.children = technologyNodes.filter(
            technologyNode =>
                technologyNode.parent.relativeDirectory === topicNode.frontmatter.pathTitle
        )
        createSpecificPage(topicNode.frontmatter.pathTitle, TopicComponent, topicNode)
    })

    // create technology pages to display relating lectures
    technologyNodes.forEach(technologyNode => {
        const relPath =
            technologyNode.parent.relativeDirectory + '/' + technologyNode.frontmatter.pathTitle

        technologyNode.children = lectureNodes
            .filter(lectureNode => lectureNode.parent.relativeDirectory.includes(relPath))
            .sort((a, b) => a.frontmatter.logicalOrder - b.frontmatter.logicalOrder)

        createSpecificPage(relPath, TechnologyComponent, technologyNode)
    })

    // create separate page for each lecture
    lectureNodes.forEach(lectureNode => {
        createSpecificPage(lectureNode.parent.relativeDirectory, LectureComponent, lectureNode)
    })
}
