import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface BreadcrumbNavProps {
  items: {
    label: string
    href?: string
  }[]
}

function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <Breadcrumb>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <BreadcrumbItem
            key={item.label}
            href={item.href}
            isCurrent={isLast}
          >
            {item.label}
            {!isLast && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export { BreadcrumbNav }
