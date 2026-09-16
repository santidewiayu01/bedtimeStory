/**
 * Centers content and applies the shared page gutter.
 * Every section should be wrapped with this instead of
 * repeating max-width/padding utilities inline.
 */
function Container({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </Tag>
  )
}

export default Container
