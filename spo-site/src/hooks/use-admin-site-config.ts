"use client"

import { useState, useCallback } from "react"
import { siteConfig } from "@/config/site"
import { getAdminData, saveAdminData } from "@/lib/admin-store"
import type { SiteConfig } from "@/types"

const STORAGE_KEY = "siteConfig"

export function useAdminSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const data = getAdminData<SiteConfig>(STORAGE_KEY, [siteConfig])
    return data[0] ?? siteConfig
  })

  const save = useCallback((data: SiteConfig) => {
    saveAdminData(STORAGE_KEY, [data])
    setConfig(data)
  }, [])

  return {
    config,
    isLoaded: true,
    save,
  }
}
