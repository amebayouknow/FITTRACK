"use client";

interface DoubleDonutProps {
  currentTotal: number;
  currentCompleted: number;
  previousTotal: number;
  previousCompleted: number;
  currentLabel: string;
  previousLabel: string;
  size?: number;
}

export default function DoubleDonut({ 
  currentTotal,
  currentCompleted,
  previousTotal,
  previousCompleted,
  currentLabel,
  previousLabel,
  size = 180 
}: DoubleDonutProps) {
  const currentPercentage = Math.round((currentCompleted / currentTotal) * 100);
  const previousPercentage = Math.round((previousCompleted / previousTotal) * 100);
  
  const strokeWidth = 12;
  const radius1 = (size - strokeWidth * 2) / 2;
  const radius2 = radius1 - strokeWidth - 5;
  const circumference = 2 * Math.PI * radius1;

  const currentOffset = circumference - (currentPercentage / 100) * circumference;
  const previousOffset = circumference - (previousPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Фоновое кольцо для внешнего круга */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius1}
          fill="none"
          stroke="#b7b7b7"
          strokeWidth={strokeWidth}
        />
        
        {/* Внешнее кольцо (текущий период) - ОРАНЖЕВОЕ */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius1}
          fill="none"
          stroke="#f97316"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={currentOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Фоновое кольцо для внутреннего круга */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius2}
          fill="none"
          stroke="#b7b7b7"
          strokeWidth={strokeWidth}
        />
        
        {/* Внутреннее кольцо (прошлый период) - КРАСНОЕ */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius2}
          fill="none"
          stroke="#DC2626"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={previousOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Надписи под диаграммой */}
      <div className="mt-8 text-center space-y-4">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-2xl font-bold text-[#f97316]">{currentPercentage}%</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#DC2626]">{previousPercentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}