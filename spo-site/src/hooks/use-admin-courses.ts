"use client"

import { useAdminResource } from "./use-admin-resource"
import type { Course } from "@/types"

export function useAdminCourses() {
  const { items, isLoaded, error, refresh, getById, save, create, remove } =
    useAdminResource<Course>("courses")
  return {
    courses: items,
    isLoaded,
    error,
    refresh,
    getById,
    save,
    create,
    remove,
  }
}
