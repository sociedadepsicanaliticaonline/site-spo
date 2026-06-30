import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import Link from "next/link"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("", className)} {...props}>
      <ol className="flex items-center gap-1.5 body-sm text-text-light">
        {children}
      </ol>
    </nav>
  )
}

interface BreadcrumbItemProps {
  href?: string
  children: React.ReactNode
  isCurrent?: boolean
}

function BreadcrumbItem({ href, children, isCurrent }: BreadcrumbItemProps) {
  if (isCurrent) {
    return <li aria-current="page" className="text-text font-medium">{children}</li>
  }

  return (
    <li className="flex items-center gap-1.5">
      {href ? (
        <Link
          href={href}
          className="hover:text-primary transition-colors"
        >
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </li>
  )
}

function BreadcrumbLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-primary transition-colors">
      {children}
    </Link>
  )
}

function BreadcrumbSeparator() {
  return <ChevronRight className="h-3.5 w-3.5 text-text-light" />
}

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator }
