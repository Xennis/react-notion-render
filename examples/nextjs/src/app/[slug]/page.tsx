import { Render } from "@react-notion-cms/render"
import { getCachedPageContent, getCachedPages } from "@/lib/fetchers"
import { notFound } from "next/navigation"
import Link from "next/link"

import { Code } from "@/components/code"
import { Iframe } from "@/components/iframe"

export async function generateStaticParams() {
  return (await getCachedPages()).map((p) => ({ slug: p.slug }))
}

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const pages = await getCachedPages()
  const page = pages.find((p) => p.slug === params.slug)
  if (page === undefined) {
    notFound()
  }
  const blocks = await getCachedPageContent(page.blockId)

  return (
    <Render
      blocks={blocks}
      options={{
        // Example customization: Render dates as German dates
        formatDateFn: (date: Date) => {
          return date.toLocaleDateString("de", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        },
        // Example resolving links to other Notion pages
        resolveLinkFn: (nId) => {
          const page = pages.find((p) => p.blockId === nId)
          if (page === undefined) {
            return null
          }
          return {
            href: page.slug,
            icon: page.icon,
          }
        },
        htmlComponents: {
          // Example customization: Render links in a different style and use the Link component of Next.js
          a: (props) => {
            return (
              <Link
                className="border-b-2 border-teal-500 font-semibold hover:border-b-0"
                href={props.href ?? "#"}
                {...props}
              >
                {props.children}
              </Link>
            )
          },
          // Example customization: Highlight code with Prism.js
          code: (props) => <Code {...props} />,
          // Example customization: Directly embed videos from YouTube
          iframe: (props) => <Iframe {...props} />,
        },
      }}
    />
  )
}
