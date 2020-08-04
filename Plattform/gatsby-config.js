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
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
    ],
}
