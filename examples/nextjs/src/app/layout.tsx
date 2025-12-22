import { Inter } from "next/font/google"
import Link from "next/link"

import { ToggleDarkModeButton, ToggleRtlDirectionButton } from "../components/toggle-button"

import "@xennis/react-notion-cms-render/dist/styles.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={[inter.className, "dark:bg-slate-800"].join(" ")} suppressHydrationWarning>
        <header className="w-full bg-teal-500">
          <div className="mx-auto flex max-w-(--breakpoint-lg) justify-between px-3 py-2">
            <div className="flex gap-4">
              <ToggleDarkModeButton />
              <ToggleRtlDirectionButton />
            </div>
            <nav className="flex gap-4">
              <Link className="hover:underline" href="/custom">
                Custom
              </Link>
              <a className="hover:underline" href="https://github.com/Xennis/react-notion-render" target="_blank">
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-(--breakpoint-lg) px-3 pb-10">{children}</main>
      </body>
    </html>
  )
}
