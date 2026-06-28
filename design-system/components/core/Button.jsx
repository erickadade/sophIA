export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const sizes = {
    sm: { height: '32px', padding: '0 12px', fontSize: 'var(--text-sm)' },
    md: { height: '40px', padding: '0 18px', fontSize: 'var(--text-base)' },
    lg: { height: '48px', padding: '0 22px', fontSize: 'var(--text-lg)' },
  };

  const variants = {
    primary: {
      background: hovered ? 'var(--accent-primary-hover)' : 'var(--accent-primary)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid transparent',
    },
    secondary: {
      background: hovered ? 'var(--accent-secondary-hover)' : 'var(--accent-secondary)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid transparent',
    },
    ghost: {
      background: hovered ? 'var(--bg-subtle)' : 'transparent',
      color: 'var(--text-primary)',
      border: `1.5px solid ${hovered ? 'var(--border-strong)' : 'var(--border-default)'}`,
    },
    text: {
      background: 'transparent',
      color: 'var(--accent-primary)',
      border: '1.5px solid transparent',
      textDecoration: hovered ? 'underline' : 'none',
    },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-semibold)',
    letterSpacing: 'var(--tracking-wide)',
    borderRadius: 'var(--radius-btn)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
    transition: 'all var(--transition-fast)',
    width: fullWidth ? '100%' : 'auto',
    userSelect: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
  };

  return (
    <button
      type={type}
      style={style}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </button>
  );
}
