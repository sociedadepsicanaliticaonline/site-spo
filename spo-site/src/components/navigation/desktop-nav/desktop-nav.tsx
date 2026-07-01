"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNavigation } from "@/data/navigation"

interface DesktopNavProps {
  className?: string
}

function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname()
  const [openId, setOpenId] = React.useState<string | null>(null)
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimeoutRef.current = setTimeout(() => setOpenId(null), 150)
  }

  const isItemActive = (href: string, childHrefs: string[] = []) => {
    if (pathname === href) return true
    return childHrefs.some((childHref) => pathname === childHref || pathname.startsWith(childHref + "/"))
  }

  return (
    <nav className={cn("items-center gap-1", className)} aria-label="Principal">
      {mainNavigation.map((item) => {
        const hasChildren = !!item.children?.length
        const childHrefs = item.children?.map((child) => child.href) ?? []
        const isActive = isItemActive(item.href, childHrefs)
        const isOpen = openId === item.id

        if (!hasChildren) {
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-2 rounded-lg body-md font-medium transition-colors whitespace-nowrap",
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
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              cancelClose()
              setOpenId(item.id)
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              onFocus={() => setOpenId(item.id)}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-2 rounded-lg body-md font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-text hover:text-primary hover:bg-surface"
              )}
              aria-expanded={isOpen}
              aria-haspopup="menu"
            >
              {item.label}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div
                role="menu"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className="absolute left-0 top-full pt-2 z-50"
              >
                <div className="min-w-[220px] rounded-xl border border-border bg-white shadow-lg p-1.5">
                  {item.children!.map((child) => {
                    const childActive = pathname === child.href
                    return (
                      <Link
                        key={child.id}
                        href={child.href}
                        role="menuitem"
                        className={cn(
                          "block px-3 py-2 rounded-lg body-sm transition-colors",
                          childActive
                            ? "text-primary bg-primary/5"
                            : "text-text hover:bg-surface hover:text-primary"
                        )}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export { DesktopNav }
