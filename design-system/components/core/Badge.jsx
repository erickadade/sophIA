export function Badge({
  variant = 'theme',
  size = 'sm',
  children,
}) {
  const sizes = {
    sm: { fontSize: 'var(--text-xs)', padding: '2px 8px', height: '20px' },
    md: { fontSize: 'var(--text-sm)', padding: '3px 10px', height: '24px' },
    lg: { fontSize: 'var(--text-base)', padding: '4px 14px', height: '28px' },
  };

  const variants = {
    // Philosophical themes — olive
    theme: {
      background: 'var(--accent-secondary-subtle)',
      color: 'var(--accent-secondary)',
      borderColor: 'var(--color-olive-200)',
    },
    // Historical period — gold
    period: {
      background: 'var(--accent-tertiary-subtle)',
      color: 'var(--accent-tertiary-hover)',
      borderColor: 'var(--color-gold-200)',
    },
    // Resource type — terracotta
    resource: {
      background: 'var(--accent-primary-subtle)',
      color: 'var(--accent-primary)',
      borderColor: 'var(--color-terracotta-200)',
    },
    // General neutral
    neutral: {
      background: 'var(--bg-subtle)',
      color: 'var(--text-secondary)',
      borderColor: 'var(--border-subtle)',
    },
    // Solid filled terracotta — high-emphasis status
    solid: {
      background: 'var(--accent-primary)',
      color: 'var(--text-on-accent)',
      borderColor: 'transparent',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-medium)',
        borderRadius: 'var(--radius-tag)',
        border: '1px solid',
        letterSpacing: 'var(--tracking-wide)',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        ...sizes[size],
        ...variants[variant],
      }}
    >
      {children}
    </span>
  );
}
