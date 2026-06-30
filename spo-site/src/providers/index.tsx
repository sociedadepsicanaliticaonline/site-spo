"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { useState } from "react"

interface ProvidersProps {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
        />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export { Providers }
