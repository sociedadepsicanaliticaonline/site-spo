// Gera as chaves ANON_KEY e SERVICE_ROLE_KEY do Supabase
// Uso: node generate-keys.js <JWT_SECRET>

const crypto = require("crypto")

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function signJwt(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + 10 * 365 * 24 * 60 * 60, // 10 anos
  }
  const headerB64 = base64url(JSON.stringify(header))
  const payloadB64 = base64url(JSON.stringify(fullPayload))
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${headerB64}.${payloadB64}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
  return `${headerB64}.${payloadB64}.${signature}`
}

const jwtSecret = process.argv[2]
if (!jwtSecret) {
  console.error("Uso: node generate-keys.js <JWT_SECRET>")
  console.error("Exemplo: node generate-keys.js 'minha-chave-secreta-com-pelo-menos-32-chars'")
  process.exit(1)
}
if (jwtSecret.length < 32) {
  console.error("❌ JWT_SECRET deve ter pelo menos 32 caracteres")
  console.error(`Atual: ${jwtSecret.length} caracteres`)
  process.exit(1)
}

const iss = "supabase"
const ref = "001" // qualquer ref

const anonToken = signJwt({ iss, ref, role: "anon" }, jwtSecret)
const serviceToken = signJwt({ iss, ref, role: "service_role" }, jwtSecret)

console.log("")
console.log("✅ Tokens gerados com sucesso!")
console.log("")
console.log("ANON_KEY:")
console.log(anonToken)
console.log("")
console.log("SERVICE_ROLE_KEY:")
console.log(serviceToken)
console.log("")
console.log("📋 Configure estas duas variáveis no .env do Supabase no Coolify:")
console.log("   ANON_KEY=<valor acima>")
console.log("   SERVICE_ROLE_KEY=<valor acima>")
console.log("")
console.log("🔑 Use o SERVICE_ROLE_KEY no seed e no secret do Cloudflare Worker")
console.log("🔑 Use o ANON_KEY como NEXT_PUBLIC_SUPABASE_ANON_KEY no app")
