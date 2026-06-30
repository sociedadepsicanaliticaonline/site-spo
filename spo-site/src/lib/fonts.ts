import { Playfair_Display, Inter } from "next/font/google"

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})
