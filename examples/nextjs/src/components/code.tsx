"use client"

import { useEffect, useRef } from "react"
import { highlightElement } from "prismjs"

import "prismjs/components/prism-typescript.min.js"
import "prismjs/themes/prism-okaidia.min.css" // theme

export const Code = ({ ...props }: React.ComponentPropsWithoutRef<"code">) => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      try {
        highlightElement(ref.current)
      } catch (error) {
        console.warn("prismjs highlight error", error)
      }
    }
  }, [ref])

  return (
    <code dir="ltr" ref={ref} {...props}>
      {props.children}
    </code>
  )
}
