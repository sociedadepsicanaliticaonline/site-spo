"use client"

import { useState, useCallback } from "react"
import { testimonials } from "@/data/testimonials"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { Testimonial } from "@/types"

const STORAGE_KEY = "testimonials"

export function useAdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>(() =>
    getAdminData(STORAGE_KEY, testimonials)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<Testimonial>(STORAGE_KEY, testimonials, id)
    },
    []
  )

  const save = useCallback((testimonial: Testimonial) => {
    const updated = saveAdminItem<Testimonial>(STORAGE_KEY, testimonials, testimonial)
    setItems(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<Testimonial, "id">) => {
      const newItem: Testimonial = { ...data, id: generateId() }
      return save(newItem)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<Testimonial>(STORAGE_KEY, testimonials, id)
    setItems(updated)
    return updated
  }, [])

  return {
    testimonials: items,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
