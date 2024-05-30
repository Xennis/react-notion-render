import { cn } from "../../util"

export const A = ({ className, ...props }: React.ComponentPropsWithoutRef<"a">) => {
  return (
    // ref: .notion-link
    <a
      style={{ transition: "border-color 100ms ease-in,opacity 100ms ease-in" }}
      className={cn(
        "break-words text-inherit underline decoration-[--fg-color-2] opacity-70 hover:decoration-[--fg-color-6] hover:opacity-100",
        className ?? "",
      )}
      {...props}
    >
      {props.children}
    </a>
  )
}
