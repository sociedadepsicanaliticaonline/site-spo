"use client"

import { useCallback, useState } from "react"
import { formacaoContents } from "@/data/formacao-content"
import {
  getAdminData,
  saveAdminItem,
} from "@/lib/admin-store"
import type { FormacaoContent, FormacaoContentKey } from "@/types"

const STORAGE_KEY = "formacao_contents"

function ensureSeeded(): FormacaoContent[] {
  const existing = getAdminData<FormacaoContent>(STORAGE_KEY, formacaoContents)
  const existingKeys = new Set(existing.map((item) => item.key))
  const missing = formacaoContents.filter((item) => !existingKeys.has(item.key))
  if (missing.length === 0) return existing
  const merged = [...existing, ...missing]
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        `spo_admin_${STORAGE_KEY}`,
        JSON.stringify(merged)
      )
    } catch {}
  }
  return merged
}

export function useAdminFormacaoContent() {
  const [items, setItems] = useState<FormacaoContent[]>(() => ensureSeeded())

  const getByKey = useCallback((key: FormacaoContentKey) => {
    const data = getAdminData<FormacaoContent>(STORAGE_KEY, formacaoContents)
    return data.find((item) => item.key === key)
  }, [])

  const save = useCallback((item: FormacaoContent) => {
    const updated = saveAdminItem<FormacaoContent>(STORAGE_KEY, formacaoContents, item)
    setItems(updated)
    return updated
  }, [])

  return {
    formacaoContents: items,
    isLoaded: true,
    getByKey,
    save,
  }
}
