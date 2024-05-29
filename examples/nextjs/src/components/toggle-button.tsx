"use client"

import { useState } from "react"
import { classNames } from "@react-notion-cms/render/dist/util"

const Button = ({ className, ...props }: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className={classNames(
        "rounded bg-black px-2 py-1 text-sm font-semibold text-white hover:bg-gray-800",
        className ?? "",
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}

export const ToggleDarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false)

  const handleClick = () => {
    const enabled = !darkMode
    setDarkMode(enabled)
    if (enabled) {
      document.querySelector("html")?.classList.add("dark")
    } else {
      document.querySelector("html")?.classList.remove("dark")
    }
  }

  return <Button onClick={handleClick}>{darkMode ? "Light" : "Dark"} Mode</Button>
}

export const ToggleRtlDirectionButton = () => {
  const [rtlDirection, setRtlDirection] = useState(false)

  const handleClick = () => {
    const enabled = !rtlDirection
    setRtlDirection(enabled)
    if (enabled) {
      document.body.style.direction = "rtl"
    } else {
      document.body.style.direction = "ltr"
    }
  }

  return <Button onClick={handleClick}>{rtlDirection ? "LTR" : "RTL"} Direction</Button>
}
