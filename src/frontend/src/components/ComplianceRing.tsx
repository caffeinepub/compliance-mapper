interface ComplianceRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  sublabel?: string;
}

export default function ComplianceRing({
  value,
  size = 100,
  strokeWidth = 8,
  color = "oklch(0.62 0.22 250)",
  label,
  sublabel,
}: ComplianceRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  const getColor = (pct: number) => {
    if (pct >= 80) return "oklch(0.7 0.2 145)"; // green
    if (pct >= 60) return "oklch(0.75 0.18 55)"; // amber
    if (pct >= 40) return "oklch(0.72 0.2 30)"; // orange
    return "oklch(0.6 0.22 25)"; // red
  };

  const ringColor = color === "auto" ? getColor(progress) : color;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          role="img"
          aria-label={`${label}: ${progress}%`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(0.25 0.04 255)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s ease-in-out",
              filter: `drop-shadow(0 0 6px ${ringColor})`,
            }}
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display font-bold text-foreground"
            style={{ fontSize: size * 0.2 }}
          >
            {progress}%
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="font-mono text-xs font-semibold text-foreground">
          {label}
        </div>
        {sublabel && (
          <div className="text-[10px] text-muted-foreground mt-0.5">
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}
