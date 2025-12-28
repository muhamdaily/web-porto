import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.DOMAIN || 'https://muhamdaily.dev'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}