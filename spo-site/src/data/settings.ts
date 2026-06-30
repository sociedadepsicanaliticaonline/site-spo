import { siteConfig } from "@/config/site"

export const settings = {
  site: siteConfig,
  features: {
    blog: true,
    events: true,
    courses: true,
    coordinators: true,
    newsletter: true,
  },
  pagination: {
    postsPerPage: 9,
    eventsPerPage: 12,
    coursesPerPage: 12,
  },
} as const
