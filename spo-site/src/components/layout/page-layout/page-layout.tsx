import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main id="main-content" className={cn("flex-1", className)}>
      {children}
    </main>
  )
}

export { PageLayout }
