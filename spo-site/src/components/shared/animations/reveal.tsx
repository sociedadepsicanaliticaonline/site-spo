"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  width?: "full" | "fit"
}

function Reveal({ children, className, delay = 0, width = "full" }: RevealProps) {
  return (
    <div className={cn(width === "full" ? "w-full" : "w-fit", "overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
        variants={{
          hidden: { y: "100%" },
          visible: { y: 0 },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export { Reveal }
