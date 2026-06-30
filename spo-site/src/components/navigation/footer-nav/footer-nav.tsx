import Link from "next/link"

import type { FooterColumn } from "@/types"

interface FooterNavProps {
  columns: FooterColumn[]
}

function FooterNav({ columns }: FooterNavProps) {
  return (
    <>
      {columns.map((column) => (
        <div key={column.id} className="space-y-4">
          <h3 className="caption text-white font-bold">{column.title}</h3>
          <ul className="space-y-3">
            {column.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="body-md text-white/70 hover:text-primary-light transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export { FooterNav }
