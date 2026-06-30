"use client"

import { useState, useCallback } from "react"
import { carteis } from "@/data/carteis"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { Cartel } from "@/types"

const STORAGE_KEY = "carteis"

export function useAdminCartels() {
  const [items, setItems] = useState<Cartel[]>(() =>
    getAdminData(STORAGE_KEY, carteis)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<Cartel>(STORAGE_KEY, carteis, id)
    },
    []
  )

  const save = useCallback((cartel: Cartel) => {
    const updated = saveAdminItem<Cartel>(STORAGE_KEY, carteis, cartel)
    setItems(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<Cartel, "id">) => {
      const newCartel: Cartel = { ...data, id: generateId() }
      return save(newCartel)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<Cartel>(STORAGE_KEY, carteis, id)
    setItems(updated)
    return updated
  }, [])

  return {
    carteis: items,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
