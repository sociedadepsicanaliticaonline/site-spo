import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { courses } from "@/data/courses"
import { events } from "@/data/events"

export default function sitemap(): MetadataRoute.Sitemap {
  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${siteConfig.url}/seminarios/${course.slug}`,
    lastModified: new Date(course.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteConfig.url}/eventos/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/seminarios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...courseEntries,
    {
      url: `${siteConfig.url}/eventos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...eventEntries,
    {
      url: `${siteConfig.url}/producao-psicanalitica`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/carteis`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/nossa-revista`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/nossos-livros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
