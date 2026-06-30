"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNavigation } from "@/data/navigation"
import { Button } from "@/components/ui/button"

function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-text hover:text-primary hover:bg-surface transition-colors"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-white md:hidden">
          <nav className="flex flex-col p-6 gap-2" aria-label="Mobile">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-lg body-md font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-text hover:text-primary hover:bg-surface"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-lg bg-primary text-white body-md font-medium hover:bg-primary-light transition-colors"
              >
                Portal do Aluno
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export { MobileMenu }
