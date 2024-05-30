import { Render } from "@react-notion-cms/render"
import { getCachedPageContent } from "@/lib/fetchers"

const demoLocale = "en_US"

const formatDateFn = (date: Date) => {
  return date.toLocaleDateString(demoLocale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function CustomPage() {
  const blocks = await getCachedPageContent(process.env.NOTION_BLOCK_ID!)

  return (
    <Render
      blocks={blocks}
      options={{
        formatDateFn: formatDateFn,
        resolveLinkFn: (nId) => ({ href: nId, icon: null }),
        htmlComponents: {
          a: (props: React.ComponentPropsWithoutRef<"a">) => {
            return (
              <a className="underline decoration-teal-500 decoration-2 underline-offset-1" {...props}>
                {props.children}
              </a>
            )
          },
        },
      }}
    />
  )
}
