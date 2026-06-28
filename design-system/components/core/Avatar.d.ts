/**
 * Circular avatar for philosopher profiles, teacher accounts, and student identification.
 * Always falls back gracefully to initials styled in Fraunces — never shows a broken image.
 */
export interface AvatarProps {
  /** Optional image URL */
  src?: string;
  /** Display name — used for alt text and initials fallback (first letter of each word) */
  name?: string;
  /** Size preset in px: sm=28, md=40, lg=56, xl=80 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export declare function Avatar(props: AvatarProps): JSX.Element;
