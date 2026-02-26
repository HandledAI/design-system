"use client"

import type { ComponentProps, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant"
}

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    data-slot="message"
    className={cn(
      "group flex w-full items-end gap-3 py-2",
      from === "user" ? "is-user justify-end" : "is-assistant justify-start",
      className
    )}
    {...props}
  />
)

const messageContentVariants = cva(
  "flex flex-col gap-2 overflow-hidden text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
  {
    variants: {
      variant: {
        contained: [
          "max-w-[85%] px-6 py-4 rounded-[24px]",
          "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground group-[.is-user]:rounded-br-sm",
          "group-[.is-assistant]:bg-muted group-[.is-assistant]:text-foreground group-[.is-assistant]:rounded-bl-sm",
        ],
        flat: [
          "group-[.is-user]:max-w-[85%] group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground",
          "group-[.is-assistant]:text-foreground",
        ],
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  }
)

export type MessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageContentVariants>

export const MessageContent = ({
  children,
  className,
  variant,
  ...props
}: MessageContentProps) => (
  <div
    data-slot="message-content"
    className={cn(messageContentVariants({ variant, className }))}
    {...props}
  >
    {children}
  </div>
)

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src?: string
  name?: string
}

export const MessageAvatar = ({
  src,
  name,
  className,
  children,
  ...props
}: MessageAvatarProps) => (
  <Avatar className={cn("ring-border size-8 ring-1 shrink-0", className)} {...props}>
    {children}
    {src && <AvatarImage alt="" className="mt-0 mb-0" src={src} />}
    {!children && !src && <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>}
  </Avatar>
)
