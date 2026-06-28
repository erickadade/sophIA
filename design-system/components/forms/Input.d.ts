/**
 * Text input with optional label, leading icon, helper text, and error state.
 * Used for search bars, assignment text fields, and all forms in sophIA.
 * On focus: border turns terracotta; icon activates to match.
 */
export interface InputProps {
  /** HTML input type */
  type?: string;
  /** Placeholder text in Argentine informal register ("Buscá recursos…") */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Keydown handler (e.g. for Enter to submit) */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Label text rendered above the input */
  label?: string;
  /** Helper text shown below the input in secondary color */
  helperText?: string;
  /** Error message — replaces helperText and applies error styling */
  error?: string;
  /** Disables interaction and dims the field */
  disabled?: boolean;
  /** Leading icon element (use Lucide icons at 16px) */
  icon?: React.ReactNode;
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Spans the full width of its container */
  fullWidth?: boolean;
  /** HTML name attribute */
  name?: string;
  /** HTML id — linked to the label for accessibility */
  id?: string;
}

export declare function Input(props: InputProps): JSX.Element;
