"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-fade-in" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl data-[state=open]:animate-slide-in",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6 border-b border-border", className)} {...props} />
)

const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("heading-md text-text", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("body-md text-text-light", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription }
