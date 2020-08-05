exports.onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage.startsWith('develop')) {
        actions.setWebpackConfig({
            resolve: {
                alias: {
                    'react-dom': '@hot-loader/react-dom',
                },
            },
        })
    }
}

const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allMarkdownRemark {
                nodes {
                    id
                    frontmatter {
                        pathTitle
                        title
                        description
                        design
                        iconPath {
                            publicURL
                        }
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

    const CATALOG_ROOT = 'src/components/Catalog/'

    const RootComponent = path.resolve(CATALOG_ROOT + 'CatalogRoot.tsx')
    const TopicComponent = path.resolve(CATALOG_ROOT + 'CatalogTopic.tsx')
    const TechnologyComponent = path.resolve(CATALOG_ROOT + 'CatalogTechnology.tsx')
    const LectureComponent = path.resolve(CATALOG_ROOT + 'CatalogLecture.tsx')

    const topicNodes = []
    const technologyNodes = []
    const lectureNodes = []

    result.data.allMarkdownRemark.nodes.forEach(node => {
        const relDir = node.parent.relativeDirectory
        const pathLevel = !relDir ? 0 : relDir.split('/').length
        switch (pathLevel) {
            case 0:
                topicNodes.push(node)
                break
            case 1:
                technologyNodes.push(node)
                break
            case 3:
                lectureNodes.push(node)
                break
            default:
                break
        }
    })

    const createSpecificPage = (path, component, node) =>
        createPage({
            path,
            component,
            context: {
                node,
            },
        })

    // create root page to display topics
    createSpecificPage('/', RootComponent, { children: topicNodes })

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
        technologyNode.children = lectureNodes.filter(lectureNode =>
            lectureNode.parent.relativeDirectory.includes(relPath)
        )
        createSpecificPage(relPath, TechnologyComponent, technologyNode)
    })

    // create separate page for each lecture
    lectureNodes.forEach(lectureNode => {
        createSpecificPage(lectureNode.parent.relativeDirectory, LectureComponent, lectureNode)
    })
}
