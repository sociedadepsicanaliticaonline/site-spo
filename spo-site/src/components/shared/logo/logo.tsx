import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import logoSrc from "@/assets/logo-01.png"
import logoDarkSrc from "@/assets/logo-02.png"

interface LogoProps {
  className?: string
  variant?: "default" | "light"
  href?: string
}

function Logo({ className, variant = "default", href = "/" }: LogoProps) {
  const img = variant === "light" ? logoDarkSrc : logoSrc

  return (
    <Link href={href} className={cn("inline-flex items-center shrink-0", className)}>
      <Image
        src={img}
        alt="SPO — Sociedade Psicanalítica Online"
        className="h-[60px] w-auto shrink-0"
        priority
      />
    </Link>
  )
}

export { Logo }
