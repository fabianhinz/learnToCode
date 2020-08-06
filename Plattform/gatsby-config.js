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
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-highlight-code`,
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
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
    ],
}
