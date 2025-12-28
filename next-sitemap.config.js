/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.DOMAIN || 'https://muhamdaily.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ['/api/*', '/admin/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
}