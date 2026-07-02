import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let _publicClient: SupabaseClient | null = null
let _adminClient: SupabaseClient | null = null

interface SupabaseConfig {
  url: string
  anonKey: string
  serviceKey: string
}

function getConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !anonKey || !serviceKey) {
    throw new Error(
      "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY."
    )
  }
  return { url, anonKey, serviceKey }
}

export function getSupabase(): SupabaseClient {
  if (_publicClient) return _publicClient
  const { url, anonKey } = getConfig()
  _publicClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return _publicClient
}

export function getSupabaseAdmin(): SupabaseClient {
  if (_adminClient) return _adminClient
  const { url, serviceKey } = getConfig()
  _adminClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return _adminClient
}
