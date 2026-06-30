"use client"

import { useState, useCallback } from "react"
import { blogPosts } from "@/data/blog"
import {
  getAdminData,
  getAdminItem,
  saveAdminItem,
  deleteAdminItem,
  generateId,
} from "@/lib/admin-store"
import type { BlogPost } from "@/types"

const STORAGE_KEY = "blog"

export function useAdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    getAdminData(STORAGE_KEY, blogPosts)
  )

  const getById = useCallback(
    (id: string) => {
      return getAdminItem<BlogPost>(STORAGE_KEY, blogPosts, id)
    },
    []
  )

  const save = useCallback((post: BlogPost) => {
    const updated = saveAdminItem<BlogPost>(STORAGE_KEY, blogPosts, post)
    setPosts(updated)
    return updated
  }, [])

  const create = useCallback(
    (data: Omit<BlogPost, "id">) => {
      const newPost: BlogPost = { ...data, id: generateId() }
      return save(newPost)
    },
    [save]
  )

  const remove = useCallback((id: string) => {
    const updated = deleteAdminItem<BlogPost>(STORAGE_KEY, blogPosts, id)
    setPosts(updated)
    return updated
  }, [])

  return {
    posts,
    isLoaded: true,
    getById,
    save,
    create,
    remove,
  }
}
