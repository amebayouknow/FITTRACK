interface ArrowProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  size?: number;
  color?: string;
  onClick?: () => void;
}

export default function Arrow({ 
  direction = 'right',
  size = 30,
  color = 'var(--color-primary)',
  onClick
}: ArrowProps) {
  
  const rotation = {
    right: 'rotate(0)',
    left: 'rotate(180deg)',
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)'
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        cursor: 'pointer',
        transform: rotation[direction],
        transition: 'transform 0.2s'
      }}
      className="hover:scale-110"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8 5L16 12L8 19"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}