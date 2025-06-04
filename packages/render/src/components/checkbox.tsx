export const Checkbox = ({ checked }: { checked: boolean }) => {
  // ref: .notion-property-checkbox-unchecked
  let content = <div className="border-(--fg-color) h-4 w-4 border-[1.3px] border-solid" />

  if (checked) {
    content = (
      // ref: .notion-property-checkbox-checked
      <div className="bg-(--select-color-0) h-4 w-4">
        <svg viewBox="0 0 14 14" className="relative start-px top-px block h-3.5 w-3.5 fill-white">
          <path d="M5.5 12L14 3.5 12.5 2l-7 7-4-4.003L0 6.499z" />
        </svg>
      </div>
    )
  }

  // ref: .notion-property .notion-property-checkbox
  // note: me-2 only if ".notion-to-do-item .notion-property-checkbox"
  return <span className="me-2">{content}</span>
}
