const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "strike",
  "h2", "h3", "h4",
  "ul", "ol", "li",
  "a", "blockquote", "code", "pre",
  "img", "figure", "figcaption", "iframe",
  "hr", "div", "span",
])

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height"]),
  iframe: new Set(["src", "title", "width", "height", "frameborder", "allow", "allowfullscreen"]),
  div: new Set(["class"]),
  span: new Set(["class"]),
  p: new Set(["class"]),
}

const DANGEROUS_SCHEMES = /^(javascript|data|vbscript|file):/i

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function isSafeUrl(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (DANGEROUS_SCHEMES.test(trimmed)) return false
  return (
    trimmed.startsWith("http") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("https://")
  )
}

function getAttrs(tag: string): { name: string; value: string }[] {
  const attrs: { name: string; value: string }[] = []
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g
  let m
  while ((m = re.exec(tag)) !== null) {
    const name = m[1].toLowerCase()
    const value = m[2] ?? m[3] ?? m[4] ?? ""
    attrs.push({ name, value })
  }
  return attrs
}

function getTagName(tag: string): string {
  const m = tag.match(/^<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)/)
  return m ? m[1].toLowerCase() : ""
}

function isSelfClosing(tagName: string): boolean {
  return ["img", "br", "hr"].includes(tagName)
}

function sanitizeHtml(html: string): string {
  if (!html) return ""
  const cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")

  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g
  const tokens: { type: "open" | "close" | "self"; name: string; raw: string; attrs: { name: string; value: string }[] }[] = []
  let m
  const placeholder = cleaned.replace(tagRe, (match) => {
    const isClose = match.startsWith("</")
    const isSelf = match.endsWith("/>")
    const name = getTagName(match)
    const attrs = isClose ? [] : getAttrs(match)
    const idx = tokens.length
    tokens.push({
      type: isClose ? "close" : isSelf ? "self" : "open",
      name,
      raw: match,
      attrs,
    })
    return `__SPO_TOKEN_${idx}__`
  })

  let result = ""
  let i = 0
  let pos = 0
  const tokenRe = /__SPO_TOKEN_(\d+)__/g
  let tm
  while ((tm = tokenRe.exec(placeholder)) !== null) {
    result += escapeHtml(placeholder.slice(pos, tm.index))
    pos = tm.index + tm[0].length
    const token = tokens[parseInt(tm[1], 10)]
    if (token.type === "close") {
      if (ALLOWED_TAGS.has(token.name)) {
        result += `</${token.name}>`
      }
    } else {
      if (!ALLOWED_TAGS.has(token.name)) {
        if (token.type === "self") {
          // skip
        }
        continue
      }
      const allowed = ALLOWED_ATTRS[token.name] || new Set<string>()
      const attrParts: string[] = []
      for (const attr of token.attrs) {
        if (!allowed.has(attr.name)) continue
        if ((attr.name === "href" || attr.name === "src") && !isSafeUrl(attr.value)) continue
        attrParts.push(`${attr.name}="${escapeAttr(attr.value)}"`)
      }
      if (token.name === "a") {
        if (!attrParts.some((a) => a.startsWith("rel="))) attrParts.push('rel="noopener noreferrer"')
        if (!attrParts.some((a) => a.startsWith("target="))) attrParts.push('target="_blank"')
      }
      if (token.name === "iframe") {
        const src = token.attrs.find((a) => a.name === "src")?.value || ""
        if (!src.includes("youtube") && !src.includes("vimeo")) {
          continue
        }
      }
      const attrStr = attrParts.length ? " " + attrParts.join(" ") : ""
      if (isSelfClosing(token.name)) {
        result += `<${token.name}${attrStr} />`
      } else {
        result += `<${token.name}${attrStr}>${token.type === "self" ? "" : ""}`
      }
    }
    i++
  }
  result += escapeHtml(placeholder.slice(pos))
  return result
}

export function renderRichText(html: string): string {
  return sanitizeHtml(html)
}
