/**
 * Small label for categorizing resources by theme, historical period, or type.
 * The most common usage is `theme` (olive) on resource cards.
 * Every resource card should have at least one Badge.
 */
export interface BadgeProps {
  /**
   * Color and semantic meaning:
   * - `theme` — olive, for philosophical topics (amor, ética, libertad…)
   * - `period` — gold, for historical periods (Antigua, Medieval, Moderna…)
   * - `resource` — terracotta, for resource type (PDF, Video, Texto, Reel)
   * - `neutral` — gray, for generic metadata
   * - `solid` — filled terracotta, for high-emphasis status indicators
   */
  variant?: 'theme' | 'period' | 'resource' | 'neutral' | 'solid';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
