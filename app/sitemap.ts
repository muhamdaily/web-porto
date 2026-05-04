import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.DOMAIN || 'https://muhamdaily.dev'

    const routes = [
        '',
        '/about',
        '/projects',
        '/achievements',
        '/contact',
        '/chat',
        '/dashboard',
        '/changelog',
        '/smart-talk',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}