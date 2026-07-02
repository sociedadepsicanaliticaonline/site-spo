"use client"

import { useAdminResource } from "./use-admin-resource"
import type { Cartel } from "@/types"

export function useAdminCartels() {
  const { items, isLoaded, error, refresh, getById, save, create, remove } =
    useAdminResource<Cartel>("cartels")
  return {
    carteis: items,
    isLoaded,
    error,
    refresh,
    getById,
    save,
    create,
    remove,
  }
}
