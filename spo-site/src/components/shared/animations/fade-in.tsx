"use client"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 20,
  once = true,
}: FadeInProps) {
  const dir = variants[direction] ?? variants.up
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      variants={{
        hidden: {
          ...dir.hidden,
          ...(direction !== "none" ? {} : {}),
        },
        visible: dir.visible,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export { FadeIn }
