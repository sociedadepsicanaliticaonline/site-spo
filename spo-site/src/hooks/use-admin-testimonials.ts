"use client"

import { useAdminResource } from "./use-admin-resource"
import type { Testimonial } from "@/types"

export function useAdminTestimonials() {
  const { items, isLoaded, error, refresh, getById, save, create, remove } =
    useAdminResource<Testimonial>("testimonials")
  return {
    testimonials: items,
    isLoaded,
    error,
    refresh,
    getById,
    save,
    create,
    remove,
  }
}
