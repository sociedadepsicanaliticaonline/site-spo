"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import type { NavigationItem } from "@/types"

interface SidebarProps {
  items: NavigationItem[]
  title?: string
  className?: string
}

function Sidebar({ items, title, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("w-full lg:w-64 shrink-0", className)}>
      {title && (
        <h2 className="heading-md text-text mb-6 px-4">{title}</h2>
      )}
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2.5 rounded-lg body-md font-medium transition-colors",
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
      </nav>
    </aside>
  )
}

export { Sidebar }
