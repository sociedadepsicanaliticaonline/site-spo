"use client"



const STORAGE_PREFIX = "spo_admin_"

export function getAdminData<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key)
    if (stored) return JSON.parse(stored)
  } catch {}
  return fallback
}

export function saveAdminData<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data))
  } catch {}
}

export function getAdminItem<T extends { id: string }>(key: string, fallback: T[], id: string): T | undefined {
  const data = getAdminData(key, fallback)
  return data.find((item) => item.id === id)
}

export function saveAdminItem<T extends { id: string }>(key: string, fallback: T[], item: T): T[] {
  const data = getAdminData(key, fallback)
  const index = data.findIndex((d) => d.id === item.id)
  if (index >= 0) {
    data[index] = item
  } else {
    data.push(item)
  }
  saveAdminData(key, data)
  return data
}

export function deleteAdminItem<T extends { id: string }>(key: string, fallback: T[], id: string): T[] {
  const data = getAdminData(key, fallback)
  const filtered = data.filter((d) => d.id !== id)
  saveAdminData(key, filtered)
  return filtered
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
