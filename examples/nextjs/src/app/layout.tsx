import { Inter } from "next/font/google"
import "./globals.css"
import { classNames } from "@react-notion-cms/render/dist/util"
import { ToggleDarkModeButton, ToggleRtlDirectionButton } from "@/components/toggle-button"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={classNames(inter.className, "dark:bg-slate-800")} suppressHydrationWarning>
        <header className="w-full bg-teal-500">
          <div className="mx-auto flex max-w-screen-lg justify-between px-3 py-2">
            <div className="flex gap-4">
              <ToggleDarkModeButton />
              <ToggleRtlDirectionButton />
            </div>
            <nav>
              <a className="hover:underline" href="https://github.com/Xennis/react-notion-render" target="_blank">
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
