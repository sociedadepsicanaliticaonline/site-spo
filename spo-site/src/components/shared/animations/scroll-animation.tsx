"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  once?: boolean
}

function ScrollAnimation({ children, className, once = true }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export { ScrollAnimation }
