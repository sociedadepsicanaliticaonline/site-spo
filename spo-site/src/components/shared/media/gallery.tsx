"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Modal, ModalContent, ModalClose } from "@/components/ui/modal"

interface GalleryImage {
  src: string
  alt: string
}

interface GalleryProps {
  images: GalleryImage[]
  className?: string
  columns?: 2 | 3 | 4
}

function Gallery({ images, className, columns = 3 }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }

  return (
    <>
      <div className={cn("grid gap-4", gridCols[columns], className)}>
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            aria-label={`Abrir imagem: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      <Modal open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <ModalContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative">
            {selectedIndex !== null && (
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl"
              />
            )}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
                className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center text-text hover:bg-white transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedIndex((i) =>
                    i !== null && i < images.length - 1 ? i + 1 : i
                  )
                }
                className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center text-text hover:bg-white transition-colors"
                aria-label="Próximo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <ModalClose className="absolute -top-12 right-0 text-white" />
        </ModalContent>
      </Modal>
    </>
  )
}

export { Gallery }
