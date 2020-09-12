/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown-pages`,
                path: `${__dirname}/../Katalog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `doc-pages`,
                path: `${__dirname}/doc`,
            },
        },
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`${__dirname}/src/components/Layout/PageLayout.tsx`),
            },
        },
        {
            resolve: `gatsby-theme-material-ui`,
            options: {
                webFontsConfig: {
                    fonts: {
                        google: [
                            {
                                family: `Noto Sans`,
                                variants: [`400`, `700`],
                            },
                            {
                                family: `Ubuntu`,
                                variants: [`400`, `700`],
                            },
                        ],
                    },
                },
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-highlight-code`,
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1000,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `learn2code@HsKA`,
                short_name: `learn2code`,
                start_url: `/`,
                background_color: `#f5f5f5`,
                theme_color: `#141414`,
                display: `standalone`,
                icon: `${__dirname}/static/root.png`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: 'gatsby-plugin-local-search',
            options: {
                name: 'katalog',
                engine: 'flexsearch',
                index: ['title', 'description'],
                query: `
                {
                    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(Katalog)/" } }) {
                        nodes {
                            id
                            frontmatter {
                                title
                                pathTitle
                                description
                            }
                            parent {
                                ... on File {
                                    relativeDirectory
                                }
                            }
                        }
                    }
                }
              `,
                normalizer: ({ data }) =>
                    data.allMarkdownRemark.nodes.map(node => ({
                        id: node.id,
                        ...node.frontmatter,
                        relativeDirectory: node.parent.relativeDirectory,
                    })),
            },
        },
    ],
}
