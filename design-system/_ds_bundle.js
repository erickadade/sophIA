/* @ds-bundle: {"format":3,"namespace":"SophIADesignSystem_67e1f4","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"2588ad2580cf","components/core/Badge.jsx":"1789f8d148c8","components/core/Button.jsx":"730d1eef5185","components/display/Card.jsx":"f7d6a5e521da","components/forms/Input.jsx":"98abb38dfc66"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SophIADesignSystem_67e1f4 = window.SophIADesignSystem_67e1f4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  src,
  name,
  size = 'md'
}) {
  const sizePx = {
    sm: 28,
    md: 40,
    lg: 56,
    xl: 80
  }[size] || 40;
  const initials = name ? name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?';
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      lineHeight: 1
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  variant = 'theme',
  size = 'sm',
  children
}) {
  const sizes = {
    sm: {
      fontSize: 'var(--text-xs)',
      padding: '2px 8px',
      height: '20px'
    },
    md: {
      fontSize: 'var(--text-sm)',
      padding: '3px 10px',
      height: '24px'
    },
    lg: {
      fontSize: 'var(--text-base)',
      padding: '4px 14px',
      height: '28px'
    }
  };
  const variants = {
    // Philosophical themes — olive
    theme: {
      background: 'var(--accent-secondary-subtle)',
      color: 'var(--accent-secondary)',
      borderColor: 'var(--color-olive-200)'
    },
    // Historical period — gold
    period: {
      background: 'var(--accent-tertiary-subtle)',
      color: 'var(--accent-tertiary-hover)',
      borderColor: 'var(--color-gold-200)'
    },
    // Resource type — terracotta
    resource: {
      background: 'var(--accent-primary-subtle)',
      color: 'var(--accent-primary)',
      borderColor: 'var(--color-terracotta-200)'
    },
    // General neutral
    neutral: {
      background: 'var(--bg-subtle)',
      color: 'var(--text-secondary)',
      borderColor: 'var(--border-subtle)'
    },
    // Solid filled terracotta — high-emphasis status
    solid: {
      background: 'var(--accent-primary)',
      color: 'var(--text-on-accent)',
      borderColor: 'transparent'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      ...variants[variant]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const sizes = {
    sm: {
      height: '32px',
      padding: '0 12px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      height: '40px',
      padding: '0 18px',
      fontSize: 'var(--text-base)'
    },
    lg: {
      height: '48px',
      padding: '0 22px',
      fontSize: 'var(--text-lg)'
    }
  };
  const variants = {
    primary: {
      background: hovered ? 'var(--accent-primary-hover)' : 'var(--accent-primary)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid transparent'
    },
    secondary: {
      background: hovered ? 'var(--accent-secondary-hover)' : 'var(--accent-secondary)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid transparent'
    },
    ghost: {
      background: hovered ? 'var(--bg-subtle)' : 'transparent',
      color: 'var(--text-primary)',
      border: `1.5px solid ${hovered ? 'var(--border-strong)' : 'var(--border-default)'}`
    },
    text: {
      background: 'transparent',
      color: 'var(--accent-primary)',
      border: '1.5px solid transparent',
      textDecoration: hovered ? 'underline' : 'none'
    }
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
    ...variants[variant]
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    style: style,
    disabled: disabled,
    onClick: !disabled ? onClick : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function Card({
  children,
  variant = 'default',
  padding = 'md',
  onClick,
  style: extraStyle
}) {
  const [hovered, setHovered] = React.useState(false);
  const isInteractive = variant === 'interactive' || !!onClick;
  const paddings = {
    none: '0',
    sm: 'var(--space-3)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)'
  };
  const style = {
    backgroundColor: 'var(--bg-card)',
    border: `1px solid ${isInteractive && hovered ? 'var(--border-strong)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-card)',
    padding: paddings[padding] || paddings.md,
    transition: 'all var(--transition-normal)',
    boxShadow: isInteractive && hovered ? 'var(--shadow-md)' : variant === 'elevated' ? 'var(--shadow-md)' : variant === 'flat' ? 'none' : 'var(--shadow-xs)',
    transform: isInteractive && hovered ? 'translateY(-2px)' : 'none',
    cursor: isInteractive ? 'pointer' : 'default',
    ...extraStyle
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
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
  id
}) {
  const [focused, setFocused] = React.useState(false);
  const iconPadding = {
    sm: '34px',
    md: '40px',
    lg: '46px'
  };
  const iconOffset = {
    sm: '9px',
    md: '11px',
    lg: '13px'
  };
  const sizes = {
    sm: {
      height: '32px',
      fontSize: 'var(--text-sm)',
      paddingLeft: icon ? iconPadding.sm : '10px',
      paddingRight: '10px'
    },
    md: {
      height: '40px',
      fontSize: 'var(--text-base)',
      paddingLeft: icon ? iconPadding.md : '12px',
      paddingRight: '12px'
    },
    lg: {
      height: '48px',
      fontSize: 'var(--text-lg)',
      paddingLeft: icon ? iconPadding.lg : '14px',
      paddingRight: '14px'
    }
  };
  const borderColor = focused ? 'var(--accent-primary)' : error ? 'var(--state-error)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      width: fullWidth ? '100%' : 'auto'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: error ? 'var(--state-error)' : 'var(--text-primary)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : 'auto'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: iconOffset[size],
      color: focused ? 'var(--accent-primary)' : 'var(--text-tertiary)',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      transition: 'color var(--transition-fast)'
    }
  }, icon), /*#__PURE__*/React.createElement("input", {
    id: id,
    name: name,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    onKeyDown: onKeyDown,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
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
      ...sizes[size]
    }
  })), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--state-error)' : 'var(--text-secondary)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

})();
