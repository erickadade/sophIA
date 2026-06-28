/**
 * Primary interactive control for actions and navigation throughout the sophIA UI.
 * Use `primary` for the single most important action per view.
 * Use `ghost` for secondary actions placed alongside a primary.
 * Use `text` for low-emphasis inline actions ("Ver más", "Cancelar").
 * @startingPoint section="Core" subtitle="Buttons — primary, secondary, ghost, text; all sizes" viewport="700x240"
 */
export interface ButtonProps {
  /** Visual treatment */
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  /** Controls height, padding, and font size */
  size?: 'sm' | 'md' | 'lg';
  /** Disables interaction and dims the button */
  disabled?: boolean;
  /** Spans the full width of its container */
  fullWidth?: boolean;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: () => void;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
