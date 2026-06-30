"use client"

import { useState, useCallback } from "react"
import { events } from "@/data/events"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { Event } from "@/types"

const STORAGE_KEY = "events"

export function useAdminEvents() {
  const [items, setItems] = useState<Event[]>(() =>
    getAdminData(STORAGE_KEY, events)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<Event>(STORAGE_KEY, events, id)
    },
    []
  )

  const save = useCallback((event: Event) => {
    const updated = saveAdminItem<Event>(STORAGE_KEY, events, event)
    setItems(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<Event, "id">) => {
      const newEvent: Event = { ...data, id: generateId() }
      return save(newEvent)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<Event>(STORAGE_KEY, events, id)
    setItems(updated)
    return updated
  }, [])

  return {
    events: items,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
