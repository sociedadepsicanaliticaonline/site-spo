"use client"

import { EmptyState } from "@/components/ui/empty-state"
import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string
  width?: string
  cell: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  items: T[]
  keyExtractor: (item: T) => string
  actions?: (item: T) => React.ReactNode
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  className?: string
}

export function DataTable<T>({
  columns,
  items,
  keyExtractor,
  actions,
  emptyTitle = "Nenhum item encontrado",
  emptyDescription,
  emptyAction,
  className,
}: DataTableProps<T>) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
        className="border border-border rounded-xl bg-white"
      />
    )
  }

  return (
    <div className={cn("rounded-xl border border-border bg-white overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface border-b border-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 body-sm font-medium text-text-light"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 body-sm font-medium text-text-light text-right">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-surface/50 transition-colors">
                {columns.map((column) => (
                  <td key={`${keyExtractor(item)}-${column.key}`} className="px-4 py-3 body-md text-text">
                    {column.cell(item)}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {actions(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
