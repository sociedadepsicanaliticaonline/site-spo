"use client"

import { useAdminSiteConfig } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { SiteConfigForm } from "@/components/admin/forms/site-config-form"

export default function AdminConfigPage() {
  const { config, isLoaded } = useAdminSiteConfig()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações do Site"
        description="Gerencie as informações institucionais, contato e SEO do site."
      />
      <SiteConfigForm initialConfig={config} />
    </div>
  )
}
