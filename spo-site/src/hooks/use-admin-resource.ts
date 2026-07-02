"use client"

import { useCallback, useEffect, useState } from "react"

interface AdminResource<T extends { id: string }> {
  items: T[]
  isLoaded: boolean
  error: string | null
  refresh: () => Promise<void>
  getById: (id: string) => T | undefined
  save: (item: T) => Promise<T | null>
  create: (data: Omit<T, "id">) => Promise<T | null>
  remove: (id: string) => Promise<boolean>
}

export function useAdminResource<T extends { id: string }>(
  endpoint: string
): AdminResource<T> {
  const [items, setItems] = useState<T[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/${endpoint}`, { cache: "no-store" })
      if (!res.ok) throw new Error(`Erro ${res.status}`)
      const data = (await res.json()) as T[]
      setItems(data)
      setIsLoaded(true)
      setError(null)
    } catch (err) {
      console.error(`[useAdminResource:${endpoint}]`, err)
      setError(err instanceof Error ? err.message : "Erro ao carregar")
      setIsLoaded(true)
    }
  }, [endpoint])

  useEffect(() => {
    refresh()
  }, [refresh])

  const getById = useCallback(
    (id: string) => items.find((item) => item.id === id),
    [items]
  )

  const save = useCallback(
    async (item: T) => {
      try {
        const res = await fetch(`/api/admin/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || `Erro ${res.status}`)
        }
        const saved = (await res.json()) as T
        await refresh()
        return saved
      } catch (err) {
        console.error(`[useAdminResource:${endpoint}:save]`, err)
        throw err
      }
    },
    [endpoint, refresh]
  )

  const create = useCallback(
    async (data: Omit<T, "id">) => {
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const tempItem = { ...(data as object), id: tempId } as T
      return save(tempItem)
    },
    [save]
  )

  const remove = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/admin/${endpoint}/${id}`, {
          method: "DELETE",
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || `Erro ${res.status}`)
        }
        await refresh()
        return true
      } catch (err) {
        console.error(`[useAdminResource:${endpoint}:remove]`, err)
        throw err
      }
    },
    [endpoint, refresh]
  )

  return { items, isLoaded, error, refresh, getById, save, create, remove }
}
