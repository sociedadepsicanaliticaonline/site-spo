"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScaleInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export { ScaleIn }
