interface StatsCardsProps {
  workouts: number;
  totalTime: number;
  exercises: number;
}

export default function StatsCards({ workouts, totalTime, exercises }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      <div className="bg-accent text-black rounded-2xl p-6 shadow flex flex-col items-center text-center sm:justify-around">
        <span className="text-xl mb-2">Количество тренировок</span>
        <span className="text-3xl">{workouts}</span>
      </div>

      <div className="bg-secondary text-white rounded-2xl p-6 shadow flex flex-col items-center text-center sm:justify-around">
        <span className="text-xl mb-2">Общее время</span>
        <span className="text-3xl">{totalTime} мин</span>
      </div>

      <div className="bg-accent text-black rounded-2xl p-6 shadow flex flex-col items-center text-center sm:justify-around">
        <span className="text-lx mb-2">Количество выполненных упражнений</span>
        <span className="text-3xl">{exercises}</span>
      </div>
    </div>
  );
}