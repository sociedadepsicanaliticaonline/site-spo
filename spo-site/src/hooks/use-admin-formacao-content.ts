"use client"

import { useCallback, useEffect, useState } from "react"
import type { FormacaoContent, FormacaoContentKey } from "@/types"

export function useAdminFormacaoContent() {
  const [contents, setContents] = useState<FormacaoContent[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const refresh = useCallback(async () => {
    const res = await fetch("/api/admin/formacao", { cache: "no-store" })
    if (res.ok) {
      const data = (await res.json()) as FormacaoContent[]
      setContents(data)
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const getByKey = useCallback(
    (key: FormacaoContentKey) => contents.find((c) => c.key === key),
    [contents]
  )

  const save = useCallback(
    async (item: FormacaoContent) => {
      const res = await fetch("/api/admin/formacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
      if (res.ok) {
        await refresh()
        return (await res.json()) as FormacaoContent
      }
      return null
    },
    [refresh]
  )

  return {
    formacaoContents: contents,
    isLoaded,
    refresh,
    getByKey,
    save,
  }
}
