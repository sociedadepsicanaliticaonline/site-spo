"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { mainNavigation } from "@/data/navigation"

function MobileNav() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-text hover:text-primary hover:bg-surface transition-colors"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-white lg:hidden"
          >
            <nav className="flex flex-col p-6 gap-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {mainNavigation.map((item) => {
                const hasChildren = !!item.children?.length
                const childHrefs = item.children?.map((child) => child.href) ?? []
                const isActive = pathname === item.href ||
                  childHrefs.some((h) => pathname === h || pathname.startsWith(h + "/"))
                const isExpanded = expanded === item.id

                if (!hasChildren) {
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
                }

                return (
                  <div key={item.id} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : item.id)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 rounded-lg body-md font-medium transition-colors",
                        isActive
                          ? "text-primary bg-primary/5"
                          : "text-text hover:text-primary hover:bg-surface"
                      )}
                      aria-expanded={isExpanded}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 mt-1 mb-2 border-l-2 border-border ml-4 flex flex-col gap-1">
                            {item.children!.map((child) => {
                              const childActive = pathname === child.href
                              return (
                                <Link
                                  key={child.id}
                                  href={child.href}
                                  className={cn(
                                    "px-3 py-2 rounded-lg body-sm font-medium transition-colors",
                                    childActive
                                      ? "text-primary bg-primary/5"
                                      : "text-text-light hover:text-primary hover:bg-surface"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-lg bg-primary text-white body-md font-medium hover:bg-primary-light transition-colors"
                >
                  Portal do Aluno
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { MobileNav }
