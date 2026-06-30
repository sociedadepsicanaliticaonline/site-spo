"use client"

import { useEffect, useState } from "react"

function SkipLink() {
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab" && !focused) {
        setFocused(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [focused])

  return (
    <a
      href="#main-content"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`fixed top-3 left-3 z-[100] px-4 py-2 rounded-lg bg-primary text-white body-sm font-medium transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        focused ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      Pular para o conteúdo principal
    </a>
  )
}

export { SkipLink }
