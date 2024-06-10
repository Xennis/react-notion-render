import { cn } from "../../util"

export const A = ({ className, ...props }: React.ComponentPropsWithoutRef<"a">) => {
  return (
    // ref: .notion-link
    <a
      className={cn(
        "break-words underline decoration-[--fg-color-2] underline-offset-2 hover:no-underline",
        className ?? "",
      )}
      {...props}
    >
      {props.children}
    </a>
  )
}
