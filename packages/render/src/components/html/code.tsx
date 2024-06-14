import { cn } from "../../util"

export const Code = ({ ...props }: React.ComponentPropsWithoutRef<"code">) => {
  return <code className={cn(props.className ?? "", "block p-[1.5em]")}>{props.children}</code>
}
