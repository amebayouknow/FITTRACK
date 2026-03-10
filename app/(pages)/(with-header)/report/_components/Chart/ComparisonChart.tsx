"use client";

interface ComparisonChartProps {
  labels: string[];
  currentData: number[];
  previousData: number[];
  currentLabel?: string;
  previousLabel?: string;
}

export default function ComparisonChart({ 
  labels, 
  currentData, 
  previousData,
  currentLabel = 'Текущий',
  previousLabel = 'Прошлый'
}: ComparisonChartProps) {
  const allData = [...currentData, ...previousData];
  const maxValue = Math.max(...allData, 1);
  const minValue = Math.min(...allData, 0);
  const range = maxValue - minValue || 1;

  // Точки для текущего периода
  const currentPoints = currentData.map((value, index) => {
    const x = 20 + (index * 40);
    const y = 180 - ((value - minValue) / range) * 150;
    return `${x},${y}`;
  }).join(' ');

  // Точки для предыдущего периода
  const previousPoints = previousData.map((value, index) => {
    const x = 20 + (index * 40);
    const y = 180 - ((value - minValue) / range) * 150;
    return `${x},${y}`;
  }).join(' ');

  // Путь для заливки под текущей линией
  const fillPoints = [
    `20,180`,
    ...currentData.map((value, index) => {
      const x = 20 + (index * 40);
      const y = 180 - ((value - minValue) / range) * 150;
      return `${x},${y}`;
    }),
    `${20 + ((currentData.length - 1) * 40)},180`
  ].join(' ');

  return (
    <div className="w-full">
      <div className="flex justify-end gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffffff' }}></div>
          <span style={{ color: '#4A4A4A' }}>{currentLabel}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ background: '#988479' }}></div>
          <span style={{ color: '#4A4A4A' }}>{previousLabel}</span>
        </div>
      </div>

      <div className="relative" style={{ height: '240px' }}>
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(180deg, #ffc094 10%, #ffa25f 30%, #ff8731 70%, #f97316 100%)'
          }}
        ></div>

        <div className="absolute inset-0">
          {[30, 80, 130, 180].map((y, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t"
              style={{ 
                top: y, 
                borderColor: 'rgba(98, 69, 48, 0.15)',
                borderWidth: '1px',
                borderStyle: 'dashed'
              }}
            />
          ))}
          
          {[20, 60, 100, 140, 180].map((x, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 border-l"
              style={{ 
                left: x, 
                borderColor: 'rgba(98, 69, 48, 0.15)',
                borderWidth: '1px',
                borderStyle: 'dashed'
              }}
            />
          ))}
          
          <div className="absolute left-1 top-0 bottom-0 w-6 text-[10px] font-medium"
               style={{ color: '#ffff' }}>
            <span className="absolute" style={{ top: '25px', right: '5px' }}>{maxValue}</span>
            <span className="absolute" style={{ top: '100px', right: '5px' }}>
              {Math.round((maxValue + minValue) / 2)}
            </span>
            <span className="absolute" style={{ bottom: '35px', right: '5px' }}>{minValue}</span>
          </div>
        </div>

        <svg width="100%" height="240" viewBox="0 0 220 240" className="absolute top-0 left-0 z-10">
          <defs>
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="30%" stopColor="white" stopOpacity="0.6" />
              <stop offset="70%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <polygon
            points={fillPoints}
            fill="url(#fillGradient)"
            stroke="none"
          />
          
          <polyline
            points={previousPoints}
            fill="none"
            stroke="#988479"
            strokeWidth="2.5"
            strokeDasharray="5,5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <polyline
            points={currentPoints}
            fill="none"
            stroke="#ffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <div className="flex justify-between mt-4 px-2 relative z-20">
        {labels.map((label, i) => (
          <span 
            key={i} 
            className="text-xs font-medium"
            style={{ color: '#4A4A4A' }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}