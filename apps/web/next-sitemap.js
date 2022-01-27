/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://matnbaz.net/',
    sourceDir: 'dist/apps/web/.next',
    outDir: 'apps/web/public',
    generateRobotsTxt: true,
    exclude: ['*/404', '*/500', '*/_middleware'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://matnbaz.net/server-sitemap.xml'
        ]
    }
}
