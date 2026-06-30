"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { Container } from "@/components/layout/container"
import { Logo } from "@/components/shared/logo"
import { DesktopNav } from "@/components/navigation/desktop-nav"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { SearchBar } from "@/components/shared/search-bar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white border-b border-transparent"
      )}
    >
      <Container className="flex items-center justify-between gap-4 lg:gap-6 h-16 md:h-20">
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <Logo />
          <DesktopNav className="hidden lg:flex" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SearchBar />
          <Link
            href="#"
            className="hidden xl:inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-primary text-white body-sm font-medium hover:bg-primary-light transition-colors ml-2"
          >
            Portal do Aluno
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}

export { Header }
