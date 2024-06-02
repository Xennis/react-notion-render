import { Render } from "@react-notion-cms/render"
import { getCachedPageContent, getCachedPages } from "@/lib/fetchers"
import { notFound } from "next/navigation"

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
        // Example customization: Render links in a different style
        htmlComponents: {
          a: (props: React.ComponentPropsWithoutRef<"a">) => {
            return (
              <a
                className="font-semibold underline decoration-teal-500 decoration-2 underline-offset-2 hover:no-underline"
                {...props}
              >
                {props.children}
              </a>
            )
          },
        },
      }}
    />
  )
}
