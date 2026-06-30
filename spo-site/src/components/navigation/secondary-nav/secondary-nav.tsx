"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SecondaryNavItem {
  label: string
  href: string
}

interface SecondaryNavProps {
  items: SecondaryNavItem[]
  className?: string
}

function SecondaryNav({ items, className }: SecondaryNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex gap-1 p-1 bg-surface rounded-lg w-fit", className)}>
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 rounded-md body-sm font-medium transition-colors whitespace-nowrap",
              isActive
                ? "bg-white text-primary shadow-sm"
                : "text-text hover:text-primary"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export { SecondaryNav }
