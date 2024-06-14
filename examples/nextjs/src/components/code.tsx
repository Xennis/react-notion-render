"use client"

import { useEffect, useRef } from "react"
import hljs from "highlight.js"

import "highlight.js/styles/github-dark-dimmed.min.css" // theme

export const Code = ({ ...props }: React.ComponentPropsWithoutRef<"code">) => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      try {
        hljs.highlightElement(ref.current)
      } catch (error) {
        console.warn("highlightjs highlight error", error)
      }
    }
  }, [ref])

  return (
    <code dir="ltr" ref={ref} {...props}>
      {props.children}
    </code>
  )
}
