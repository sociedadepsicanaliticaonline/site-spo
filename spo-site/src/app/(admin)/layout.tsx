"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  FileText,
  Users,
  Settings,
  Menu,
  X,
  ExternalLink,
  Network,
  Quote,
  Image as ImageIcon,
} from "lucide-react"
import logo from "@/assets/logo-01.png"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/seminarios", label: "Seminários", icon: GraduationCap },
  { href: "/admin/eventos", label: "Eventos", icon: Calendar },
  { href: "/admin/carteis", label: "Cartéis", icon: Network },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/testemunhos", label: "Testemunhos", icon: Quote },
  { href: "/admin/coordenadores", label: "Coordenadores", icon: Users },
  { href: "/admin/media", label: "Mídia", icon: ImageIcon },
  { href: "/admin/config", label: "Configurações", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center">
            <Image
              src={logo}
              alt="SPO Admin"
              className="h-12 w-auto"
              unoptimized
              priority
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="h-5 w-5 flex-shrink-0" />
              Ver Site
            </Link>
          </div>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-3"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {navItems.find((i) => pathname === i.href || pathname.startsWith(i.href + "/"))?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
