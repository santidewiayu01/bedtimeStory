function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-lavender-100 px-4 py-1.5 text-sm font-semibold text-navy-900 ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
