"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SlideInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "left" | "right" | "top" | "bottom"
  once?: boolean
}

const slideVariants = {
  left: { hidden: { x: -60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  top: { hidden: { y: -60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  bottom: { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
}

function SlideIn({
  children,
  className,
  delay = 0,
  direction = "left",
  once = true,
}: SlideInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      variants={slideVariants[direction]}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export { SlideIn }
