import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageWrapperProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  containerClassName?: string
  priority?: boolean
  sizes?: string
}

function ImageWrapper({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  containerClassName,
  priority = false,
  sizes,
}: ImageWrapperProps) {
  return (
    <div className={cn("relative overflow-hidden", fill ? "w-full h-full" : "", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn("object-cover", className)}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      />
    </div>
  )
}

export { ImageWrapper }
