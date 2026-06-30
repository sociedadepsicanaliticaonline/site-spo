import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

function Pagination({ currentPage, totalPages, basePath, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Paginação" className={cn("flex items-center gap-1", className)}>
      {currentPage > 1 && (
        <PaginationPrevious href={`${basePath}?page=${currentPage - 1}`} />
      )}
      {pages.map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            href={`${basePath}?page=${page}`}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
      {currentPage < totalPages && (
        <PaginationNext href={`${basePath}?page=${currentPage + 1}`} />
      )}
    </nav>
  )
}

interface PaginationItemProps {
  children: React.ReactNode
}

function PaginationItem({ children }: PaginationItemProps) {
  return <span className="inline-flex">{children}</span>
}

interface PaginationLinkProps {
  href: string
  isActive?: boolean
  children: React.ReactNode
}

function PaginationLink({ href, isActive, children }: PaginationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size: "icon",
        }),
        "h-9 w-9"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  )
}

interface PaginationPreviousProps {
  href: string
}

function PaginationPrevious({ href }: PaginationPreviousProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Anterior</span>
    </Link>
  )
}

interface PaginationNextProps {
  href: string
}

function PaginationNext({ href }: PaginationNextProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Próximo</span>
    </Link>
  )
}

export { Pagination, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext }
