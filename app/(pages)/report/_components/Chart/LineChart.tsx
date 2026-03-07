"use client";

interface LineChartProps {
  labels: string[];
  data: number[];
}

export default function LineChart({ labels, data }: LineChartProps) {
  const maxValue = Math.max(...data, 1);
  const minValue = Math.min(...data, 0);
  const range = maxValue - minValue || 1;

  // Точки для графика
  const points = data.map((value, index) => {
    const x = 20 + (index * 40);
    const y = 180 - ((value - minValue) / range) * 150;
    return `${x},${y}`;
  }).join(' ');

  // Путь для заливки под линией
  const fillPoints = [
    `20,180`,
    ...data.map((value, index) => {
      const x = 20 + (index * 40);
      const y = 180 - ((value - minValue) / range) * 150;
      return `${x},${y}`;
    }),
    `${20 + ((data.length - 1) * 40)},180`
  ].join(' ');

  return (
    <div className="w-full p-2">
      <div className="relative" style={{ height: '240px' }}>
        {/* ГРАДИЕНТНЫЙ ФОН - оранжевый снизу, белый сверху */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(180deg, #ffc094 10%, #ffa25f 30%, #ff8731 70%, #f97316 100%)'
          }}
        ></div>

        {/* Фоновая разметка */}
        <div className="absolute inset-0">
          {/* Горизонтальные линии сетки */}
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
          
          {/* Вертикальные линии сетки */}
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
          
          {/* Значения по вертикали - белые */}
          <div className="absolute left-1 top-0 bottom-0 w-6 text-[10px] font-medium text-white">
            <span className="absolute" style={{ top: '25px', right: '5px' }}>{maxValue}</span>
            <span className="absolute" style={{ top: '100px', right: '5px' }}>
              {Math.round((maxValue + minValue) / 2)}
            </span>
            <span className="absolute" style={{ bottom: '35px', right: '5px' }}>{minValue}</span>
          </div>
        </div>

        {/* SVG с графиком */}
        <svg width="100%" height="240" viewBox="0 0 220 240" className="absolute top-0 left-0 z-10">
          {/* Градиент для заливки под линией */}
          <defs>
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="30%" stopColor="white" stopOpacity="0.6" />
              <stop offset="70%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Заливка под линией */}
          <polygon
            points={fillPoints}
            fill="url(#fillGradient)"
            stroke="none"
          />
          
          {/* Основная линия - БЕЛАЯ */}
          <polyline
            points={points}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* Подписи снизу */}
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