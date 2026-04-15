interface IconProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

export function CandleIcon({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* Flame */}
      <path
        d="M10 1C10 1 7.5 4.5 7.5 6.5C7.5 8.4 8.6 9.5 10 9.5C11.4 9.5 12.5 8.4 12.5 6.5C12.5 4.5 10 1 10 1Z"
        opacity="0.7"
      />
      {/* Wick */}
      <line x1="10" y1="9.5" x2="10" y2="11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Body */}
      <rect x="6.5" y="11" width="7" height="11" rx="1.5" />
      {/* Base */}
      <ellipse cx="10" cy="22.5" rx="5.5" ry="1.5" opacity="0.35" />
    </svg>
  )
}

export function LeafIcon({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M10 17V9" />
      <path d="M10 9C10 9 5.5 8 3.5 4.5C1.5 1 6 0.5 8.5 2.5C8.5 2.5 10 5 10 9Z" />
      <path d="M10 9C10 9 14.5 8 16.5 4.5C18.5 1 14 0.5 11.5 2.5C11.5 2.5 10 5 10 9Z" />
    </svg>
  )
}

export function HandsIcon({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M3 9V6a1.5 1.5 0 013 0v3" />
      <path d="M6 7.5V5a1.5 1.5 0 013 0v2.5" />
      <path d="M9 6.5V5a1.5 1.5 0 013 0v1.5" />
      <path d="M12 6.5a1.5 1.5 0 013 0V9" />
      <path d="M3 9c0 4 2 7 7 7s7-3 7-7" />
    </svg>
  )
}

export function EcoIcon({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M10 3C6 3 3.5 6 3.5 10C3.5 14 6.5 17 10 17C13.5 17 16.5 14 15 10" />
      <path d="M15 10C15 7 13 4.5 10 4.5" />
      <path d="M16 6L15 10L11 9" />
    </svg>
  )
}

export function StarIcon({ size = 13, filled = true, className, style }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M6.5 1L8 5H12.5L8.75 7.75L10.25 12L6.5 9.25L2.75 12L4.25 7.75L0.5 5H5L6.5 1Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRightIcon({ size = 14, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M2 7H12M8 3L12 7L8 11" />
    </svg>
  )
}

export function CheckIcon({ size = 14, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M2 7L5.5 10.5L12 3.5" />
    </svg>
  )
}
