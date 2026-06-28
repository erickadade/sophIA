export function Avatar({
  src,
  name,
  size = 'md',
}) {
  const sizePx = { sm: 28, md: 40, lg: 56, xl: 80 }[size] || 40;

  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <div
      style={{
        width: sizePx,
        height: sizePx,
        borderRadius: '50%',
        backgroundColor: 'var(--color-terracotta-100)',
        color: 'var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-serif)',
        fontWeight: 'var(--weight-bold)',
        fontSize: Math.round(sizePx * 0.38) + 'px',
        overflow: 'hidden',
        flexShrink: 0,
        border: '1.5px solid var(--color-terracotta-200)',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
