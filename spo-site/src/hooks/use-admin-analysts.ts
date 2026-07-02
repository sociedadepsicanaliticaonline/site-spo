"use client"

import { useAdminResource } from "./use-admin-resource"
import type { Analyst } from "@/types"

export function useAdminAnalysts() {
  const { items, isLoaded, error, refresh, getById, save, create, remove } =
    useAdminResource<Analyst>("analysts")
  return {
    analysts: items,
    isLoaded,
    error,
    refresh,
    getById,
    save,
    create,
    remove,
  }
}
