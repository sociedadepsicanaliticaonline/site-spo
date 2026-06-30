import { cn } from "@/lib/utils"

interface AdminFormLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  className?: string
}

export function AdminFormLayout({
  children,
  sidebar,
  className,
}: AdminFormLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      <div className="lg:col-span-2 space-y-6">{children}</div>
      {sidebar && (
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">{sidebar}</div>
        </div>
      )}
    </div>
  )
}
