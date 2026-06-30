"use client"

import { useState, useCallback } from "react"
import { courses } from "@/data/courses"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { Course } from "@/types"

const STORAGE_KEY = "courses"

export function useAdminCourses() {
  const [items, setItems] = useState<Course[]>(() =>
    getAdminData(STORAGE_KEY, courses)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<Course>(STORAGE_KEY, courses, id)
    },
    []
  )

  const save = useCallback((course: Course) => {
    const updated = saveAdminItem<Course>(STORAGE_KEY, courses, course)
    setItems(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<Course, "id">) => {
      const newCourse: Course = { ...data, id: generateId() }
      return save(newCourse)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<Course>(STORAGE_KEY, courses, id)
    setItems(updated)
    return updated
  }, [])

  return {
    courses: items,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
