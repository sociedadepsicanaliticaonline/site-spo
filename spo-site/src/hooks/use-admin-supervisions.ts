"use client"

import { useAdminResource } from "./use-admin-resource"
import type { Supervision } from "@/types"

export function useAdminSupervisions() {
  const { items, isLoaded, error, refresh, getById, save, create, remove } =
    useAdminResource<Supervision>("supervisions")
  return {
    supervisions: items,
    isLoaded,
    error,
    refresh,
    getById,
    save,
    create,
    remove,
  }
}
