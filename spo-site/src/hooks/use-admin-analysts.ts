"use client"

import { useState, useCallback } from "react"
import { analysts } from "@/data/analysts"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { Analyst } from "@/types"

const STORAGE_KEY = "analysts"

export function useAdminAnalysts() {
  const [items, setItems] = useState<Analyst[]>(() =>
    getAdminData(STORAGE_KEY, analysts)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<Analyst>(STORAGE_KEY, analysts, id)
    },
    []
  )

  const save = useCallback((analyst: Analyst) => {
    const updated = saveAdminItem<Analyst>(STORAGE_KEY, analysts, analyst)
    setItems(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<Analyst, "id">) => {
      const newAnalyst: Analyst = { ...data, id: generateId() }
      return save(newAnalyst)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<Analyst>(STORAGE_KEY, analysts, id)
    setItems(updated)
    return updated
  }, [])

  return {
    analysts: items,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
