import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoThumbnailProps {
  src: string
  alt: string
  duration?: string
  className?: string
}

function VideoThumbnail({ src, alt, duration, className }: VideoThumbnailProps) {
  return (
    <div className={cn("relative group cursor-pointer overflow-hidden rounded-xl", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
        <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
          <Play className="h-6 w-6 text-primary ml-0.5" />
        </div>
      </div>
      {duration && (
        <div className="absolute bottom-3 right-3 bg-black/70 text-white body-sm px-2 py-0.5 rounded">
          {duration}
        </div>
      )}
    </div>
  )
}

export { VideoThumbnail }
