export function Input({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  label,
  helperText,
  error,
  disabled = false,
  icon,
  size = 'md',
  fullWidth = false,
  name,
  id,
}) {
  const [focused, setFocused] = React.useState(false);

  const iconPadding  = { sm: '34px', md: '40px', lg: '46px' };
  const iconOffset   = { sm: '9px',  md: '11px', lg: '13px' };
  const sizes = {
    sm: { height: '32px', fontSize: 'var(--text-sm)',   paddingLeft: icon ? iconPadding.sm : '10px', paddingRight: '10px' },
    md: { height: '40px', fontSize: 'var(--text-base)', paddingLeft: icon ? iconPadding.md : '12px', paddingRight: '12px' },
    lg: { height: '48px', fontSize: 'var(--text-lg)',   paddingLeft: icon ? iconPadding.lg : '14px', paddingRight: '14px' },
  };

  const borderColor = focused
    ? 'var(--accent-primary)'
    : error
    ? 'var(--state-error)'
    : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-semibold)',
            color: error ? 'var(--state-error)' : 'var(--text-primary)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: fullWidth ? '100%' : 'auto' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: iconOffset[size],
              color: focused ? 'var(--accent-primary)' : 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              transition: 'color var(--transition-fast)',
            }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: fullWidth ? '100%' : 'auto',
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            backgroundColor: disabled ? 'var(--bg-subtle)' : 'var(--bg-card)',
            border: `1.5px solid ${borderColor}`,
            borderRadius: 'var(--radius-input)',
            outline: 'none',
            boxShadow: focused ? 'var(--focus-ring)' : 'none',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
            opacity: disabled ? 'var(--opacity-disabled)' : 1,
            cursor: disabled ? 'not-allowed' : 'text',
            ...sizes[size],
          }}
        />
      </div>

      {(helperText || error) && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: error ? 'var(--state-error)' : 'var(--text-secondary)',
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}
