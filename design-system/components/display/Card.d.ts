/**
 * Base card container — the primary surface for resources, philosopher profiles,
 * and content blocks. All cards use `--bg-card` (#fffdf8) over the paper background.
 * Use `interactive` (or pass `onClick`) for clickable resource cards.
 * @startingPoint section="Display" subtitle="Card container — default, elevated, flat, interactive" viewport="700x200"
 */
export interface CardProps {
  /**
   * Visual variant:
   * - `default` — subtle border + xs shadow (standard resource card)
   * - `elevated` — md shadow (sidebar panels, popovers)
   * - `flat` — border only, no shadow (nested inside another card)
   * - `interactive` — hover: lift + larger shadow + darker border
   */
  variant?: 'default' | 'elevated' | 'flat' | 'interactive';
  /** Internal padding preset */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Makes the card clickable — also enables interactive hover states */
  onClick?: () => void;
  /** Additional inline styles */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
