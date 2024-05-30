"use client"

import { useState } from "react"

const Button = ({ ...props }: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button className="rounded bg-black px-2 py-1 text-sm font-semibold text-white hover:bg-gray-800" {...props}>
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
