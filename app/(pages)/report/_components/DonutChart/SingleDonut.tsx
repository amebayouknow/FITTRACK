"use client";

interface SingleDonutProps {
  total: number;
  completed: number;
  size?: number;
}

export default function SingleDonut({ total, completed, size = 180 }: SingleDonutProps) {
  const percentage = Math.round((completed / total) * 100);
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Фоновое кольцо */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#b7b7b7"
          strokeWidth={strokeWidth}
        />
        
        {/* Заполненное кольцо - ОРАНЖЕВОЕ */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f97316"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Надписи под диаграммой - в стиле DoubleDonut */}
      <div className="mt-8 text-center space-y-2">
        <div className="text-2xl font-bold text-[#f97316]">{percentage}%</div>
      </div>
    </div>
  );
}