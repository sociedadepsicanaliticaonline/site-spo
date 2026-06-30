"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { mainNavigation } from "@/data/navigation"

interface DesktopNavProps {
  className?: string
}

function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("items-center gap-1", className)} aria-label="Principal">
      {mainNavigation.map((item) => {
        const isActive = pathname === item.href

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
      })}
    </nav>
  )
}

export { DesktopNav }
