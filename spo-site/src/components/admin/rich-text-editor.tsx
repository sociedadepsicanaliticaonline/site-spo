"use client"

import { useRef, useState, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Quote,
  Code,
  Undo,
  Redo,
  Strikethrough,
  Pilcrow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MediaPicker } from "./media-picker"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
  label?: string
}

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

function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return html
  const doc = new DOMParser().parseFromString(html, "text/html")
  const walk = (node: Element) => {
    const tagName = node.tagName.toLowerCase()
    if (!ALLOWED_TAGS.has(tagName)) {
      const parent = node.parentNode
      while (node.firstChild) parent?.insertBefore(node.firstChild, node)
      parent?.removeChild(node)
      return
    }
    const allowed = ALLOWED_ATTRS[tagName]
    for (const attr of Array.from(node.attributes)) {
      if (!allowed || !allowed.has(attr.name)) {
        node.removeAttribute(attr.name)
      } else if (attr.name === "href" || attr.name === "src") {
        const value = attr.value.trim()
        if (
          value &&
          !value.startsWith("http") &&
          !value.startsWith("/") &&
          !value.startsWith("data:image") &&
          !value.startsWith("#") &&
          !value.startsWith("mailto:") &&
          !value.startsWith("https://")
        ) {
          node.removeAttribute(attr.name)
        }
      }
    }
    if (tagName === "a") {
      node.setAttribute("rel", "noopener noreferrer")
      node.setAttribute("target", "_blank")
    }
    if (tagName === "iframe") {
      const src = node.getAttribute("src") || ""
      if (!src.includes("youtube") && !src.includes("vimeo")) {
        node.parentNode?.removeChild(node)
        return
      }
    }
    for (const child of Array.from(node.children)) walk(child)
  }
  for (const el of Array.from(doc.body.children)) walk(el)
  return doc.body.innerHTML
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

function extractVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/)
  return m ? m[1] : null
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Escreva o conteúdo...",
  className,
  error,
  label,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const lastValueRef = useRef(value)

  useEffect(() => {
    if (!editorRef.current) return
    if (value !== lastValueRef.current) {
      editorRef.current.innerHTML = value
      lastValueRef.current = value
    }
  }, [value])

  const update = () => {
    if (!editorRef.current) return
    const html = editorRef.current.innerHTML
    const sanitized = sanitizeHtml(html)
    lastValueRef.current = sanitized
    onChange(sanitized)
  }

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    update()
  }

  const insertHtml = (html: string) => {
    editorRef.current?.focus()
    document.execCommand("insertHTML", false, html)
    update()
  }

  const handleImageSelect = (url: string) => {
    insertHtml(`<figure><img src="${url}" alt="" /></figure>`)
  }

  const handleInsertVideo = () => {
    const url = videoUrl.trim()
    if (!url) {
      toast.error("Informe a URL do vídeo")
      return
    }
    const ytId = extractYouTubeId(url)
    const vimeoId = extractVimeoId(url)
    if (ytId) {
      insertHtml(
        `<figure><iframe src="https://www.youtube.com/embed/${ytId}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><figcaption>YouTube: ${ytId}</figcaption></figure>`
      )
    } else if (vimeoId) {
      insertHtml(
        `<figure><iframe src="https://player.vimeo.com/video/${vimeoId}" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><figcaption>Vimeo: ${vimeoId}</figcaption></figure>`
      )
    } else {
      toast.error("URL não reconhecida. Use YouTube ou Vimeo.")
      return
    }
    setVideoUrl("")
    setVideoModalOpen(false)
  }

  const handleInsertLink = () => {
    const url = linkUrl.trim()
    if (!url) {
      toast.error("Informe a URL")
      return
    }
    const selection = window.getSelection()?.toString() || linkText
    if (selection) {
      insertHtml(`<a href="${url}">${selection}</a>`)
    } else {
      insertHtml(`<a href="${url}">${url}</a>`)
    }
    setLinkUrl("")
    setLinkText("")
    setLinkModalOpen(false)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="body-sm font-medium text-text">{label}</label>}
      <div
        className={cn(
          "rounded-lg border border-border bg-white overflow-hidden",
          error && "border-accent",
          isFocused && "ring-2 ring-primary ring-offset-1"
        )}
      >
        <div className="flex flex-wrap gap-0.5 p-1.5 border-b border-border bg-surface">
          <ToolbarButton onClick={() => exec("bold")} title="Negrito"><Bold className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("italic")} title="Itálico"><Italic className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("underline")} title="Sublinhado"><Underline className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("strikeThrough")} title="Tachado"><Strikethrough className="h-4 w-4" /></ToolbarButton>
          <div className="w-px h-6 bg-border mx-1 self-center" />
          <ToolbarButton onClick={() => exec("formatBlock", "H2")} title="Título 2"><Heading2 className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("formatBlock", "H3")} title="Título 3"><Heading3 className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("formatBlock", "P")} title="Parágrafo"><Pilcrow className="h-4 w-4" /></ToolbarButton>
          <div className="w-px h-6 bg-border mx-1 self-center" />
          <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Lista"><List className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("insertOrderedList")} title="Lista numerada"><ListOrdered className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("formatBlock", "BLOCKQUOTE")} title="Citação"><Quote className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("formatBlock", "PRE")} title="Código"><Code className="h-4 w-4" /></ToolbarButton>
          <div className="w-px h-6 bg-border mx-1 self-center" />
          <ToolbarButton onClick={() => setLinkModalOpen(true)} title="Link"><LinkIcon className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => setMediaPickerOpen(true)} title="Imagem"><ImageIcon className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => setVideoModalOpen(true)} title="Vídeo"><Video className="h-4 w-4" /></ToolbarButton>
          <div className="w-px h-6 bg-border mx-1 self-center" />
          <ToolbarButton onClick={() => exec("undo")} title="Desfazer"><Undo className="h-4 w-4" /></ToolbarButton>
          <ToolbarButton onClick={() => exec("redo")} title="Refazer"><Redo className="h-4 w-4" /></ToolbarButton>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={update}
          onBlur={() => { setIsFocused(false); update() }}
          onFocus={() => setIsFocused(true)}
          onPaste={handlePaste}
          className="min-h-[280px] p-4 body-md text-text focus:outline-none prose prose-sm max-w-none [&_h2]:heading-md [&_h3]:heading-sm [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-light [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:max-w-full [&_figure]:my-4 [&_figcaption]:text-sm [&_figcaption]:text-text-light [&_figcaption]:mt-1 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg"
          data-placeholder={placeholder}
        />
      </div>
      <p className="body-sm text-text-light">
        Use a barra acima para formatar, inserir links, imagens (da biblioteca) e vídeos do YouTube/Vimeo.
      </p>

      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleImageSelect}
        accept="image"
        title="Selecionar imagem da biblioteca"
      />

      <Modal open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Inserir vídeo</ModalTitle>
            <ModalDescription>Cole a URL do YouTube ou Vimeo.</ModalDescription>
          </ModalHeader>
          <div className="space-y-3">
            <label className="body-sm font-medium text-text">URL do vídeo</label>
            <Input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setVideoModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleInsertVideo}>Inserir</Button>
            </div>
          </div>
        </ModalContent>
      </Modal>

      <Modal open={linkModalOpen} onOpenChange={setLinkModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Inserir link</ModalTitle>
            <ModalDescription>Selecione um texto no editor e adicione a URL.</ModalDescription>
          </ModalHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="body-sm font-medium text-text">URL</label>
              <Input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="body-sm font-medium text-text">Texto (opcional, se nada estiver selecionado)</label>
              <Input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Texto do link"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setLinkModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleInsertLink}>Inserir</Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}

function ToolbarButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="h-8 w-8 rounded inline-flex items-center justify-center text-text hover:bg-white hover:text-primary transition-colors"
    >
      {children}
    </button>
  )
}
