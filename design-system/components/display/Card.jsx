export function Card({
  children,
  variant = 'default',
  padding = 'md',
  onClick,
  style: extraStyle,
}) {
  const [hovered, setHovered] = React.useState(false);
  const isInteractive = variant === 'interactive' || !!onClick;

  const paddings = {
    none: '0',
    sm:   'var(--space-3)',
    md:   'var(--space-5)',
    lg:   'var(--space-6)',
    xl:   'var(--space-8)',
  };

  const style = {
    backgroundColor: 'var(--bg-card)',
    border: `1px solid ${isInteractive && hovered ? 'var(--border-strong)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-card)',
    padding: paddings[padding] || paddings.md,
    transition: 'all var(--transition-normal)',
    boxShadow: isInteractive && hovered
      ? 'var(--shadow-md)'
      : variant === 'elevated'
      ? 'var(--shadow-md)'
      : variant === 'flat'
      ? 'none'
      : 'var(--shadow-xs)',
    transform: isInteractive && hovered ? 'translateY(-2px)' : 'none',
    cursor: isInteractive ? 'pointer' : 'default',
    ...extraStyle,
  };

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}
