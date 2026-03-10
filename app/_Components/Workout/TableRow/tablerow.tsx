"use client";

import { WorkoutData, StatData, TableRowType } from '@/app/index';

interface TableRowProps {
  data: WorkoutData | StatData;
  type?: TableRowType;
}

export default function TableRow({ data, type = 'workout' }: TableRowProps) {
  const baseClasses = "grid grid-cols-3 gap-2 w-full px-4 py-5 mb-2 rounded-2xl text-sm sm:text-base";

  if (type === 'workout') {
    const workoutData = data as WorkoutData;
    return (
      <div className={`${baseClasses} bg-stone text-black`}>
        <span className='truncate'>{workoutData.date}</span>
        <span className='truncate text-left'>{workoutData.time}</span>
        <span className='truncate text-right'>{workoutData.exercises}</span>
      </div>
    );
  }

  if (type === 'workout-alt') {
    const workoutData = data as WorkoutData;
    return (
      <div className={`${baseClasses} bg-main text-black`}>
        <span className='truncate'>{workoutData.date}</span>
        <span className='truncate text-left'>{workoutData.time}</span>
        <span className='truncate text-right'>{workoutData.exercises}</span>
      </div>
    );
  }

  if (type === 'stat') {
    const statData = data as StatData;
    return (
      <div className={`${baseClasses} bg-stone text-black`}>
        <span className='truncate'>{statData.type}</span>
        <span className='truncate text-left'>{statData.time}</span>
        <span className='truncate text-right '>{statData.count}</span>
      </div>
    );
  }

  return null;
}