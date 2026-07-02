"use client"

import { useAdminResource } from "./use-admin-resource"
import type { Event } from "@/types"

export function useAdminEvents() {
  const { items, isLoaded, error, refresh, getById, save, create, remove } =
    useAdminResource<Event>("events")
  return {
    events: items,
    isLoaded,
    error,
    refresh,
    getById,
    save,
    create,
    remove,
  }
}
