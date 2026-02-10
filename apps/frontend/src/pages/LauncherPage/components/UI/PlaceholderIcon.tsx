interface PlaceholderIconProps {
  size?: number;
}

export function PlaceholderIcon({ size = 40 }: PlaceholderIconProps) {
  return (
    <svg
      className="block"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M8 12H16M12 8V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
