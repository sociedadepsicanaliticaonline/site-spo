"use client"

import { useState, useCallback } from "react"
import { supervisions } from "@/data/supervisions"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { Supervision } from "@/types"

const STORAGE_KEY = "supervisions"

export function useAdminSupervisions() {
  const [items, setItems] = useState<Supervision[]>(() =>
    getAdminData(STORAGE_KEY, supervisions)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<Supervision>(STORAGE_KEY, supervisions, id)
    },
    []
  )

  const save = useCallback((supervision: Supervision) => {
    const updated = saveAdminItem<Supervision>(STORAGE_KEY, supervisions, supervision)
    setItems(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<Supervision, "id">) => {
      const newSupervision: Supervision = { ...data, id: generateId() }
      return save(newSupervision)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<Supervision>(STORAGE_KEY, supervisions, id)
    setItems(updated)
    return updated
  }, [])

  return {
    supervisions: items,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
