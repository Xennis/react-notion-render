import { Render } from "@react-notion-cms/render"
import { getCachedPageContent } from "@/lib/fetchers"

const demoLocales = "de"
const demoPage = "af2bbd48-fce9-471c-8c3c-21f2ac376e74"

const formatDateFn = (date: Date) => {
  return date.toLocaleDateString(demoLocales, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default async function CustomPage() {
  const blocks = await getCachedPageContent(demoPage)

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
