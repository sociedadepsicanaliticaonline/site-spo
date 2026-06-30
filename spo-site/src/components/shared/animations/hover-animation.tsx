"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverAnimationProps {
  children: React.ReactNode
  className?: string
  scale?: number
  y?: number
}

function HoverAnimation({
  children,
  className,
  scale = 1.02,
  y = -2,
}: HoverAnimationProps) {
  return (
    <motion.div
      whileHover={{ scale, y }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export { HoverAnimation }
