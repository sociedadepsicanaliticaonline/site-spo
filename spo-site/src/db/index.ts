import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

let _client: ReturnType<typeof postgres> | null = null
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getConnectionString(): string {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      "DATABASE_URL não está definida. Configure em .dev.vars (local) ou via wrangler secret (produção)."
    )
  }
  return url
}

export function getDb() {
  if (_db) return _db
  const connection = postgres(getConnectionString(), {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  })
  _client = connection
  _db = drizzle(connection, { schema })
  return _db
}

export { schema }
