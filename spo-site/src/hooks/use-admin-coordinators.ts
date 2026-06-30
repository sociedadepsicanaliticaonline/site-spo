"use client"

import { useState, useCallback } from "react"
import { coordinators } from "@/data/coordinators"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { Coordinator } from "@/types"

const STORAGE_KEY = "coordinators"

export function useAdminCoordinators() {
  const [items, setItems] = useState<Coordinator[]>(() =>
    getAdminData(STORAGE_KEY, coordinators)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<Coordinator>(STORAGE_KEY, coordinators, id)
    },
    []
  )

  const save = useCallback((coordinator: Coordinator) => {
    const updated = saveAdminItem<Coordinator>(STORAGE_KEY, coordinators, coordinator)
    setItems(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<Coordinator, "id">) => {
      const newCoordinator: Coordinator = { ...data, id: generateId() }
      return save(newCoordinator)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<Coordinator>(STORAGE_KEY, coordinators, id)
    setItems(updated)
    return updated
  }, [])

  return {
    coordinators: items,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
