"use client";

import { WorkoutData, StatData, TableRowType } from '../../../index';

interface TableRowProps {
  data: WorkoutData | StatData;
  type?: TableRowType;
}

export default function TableRow({ data, type = 'workout' }: TableRowProps) {
  const baseClasses = "grid grid-cols-3 px-3 py-3 rounded-[16px] mb-2 shadow";
  
  if (type === 'workout') {
    const workoutData = data as WorkoutData;
    return (
      <div className={`${baseClasses} bg-stone`}>
        <span>{workoutData.date}</span>
        <span>{workoutData.time}</span>
        <span>{workoutData.exercises}</span>
      </div>
    );
  }

  if (type === 'workout-alt') {
    const workoutData = data as WorkoutData;
    return (
      <div className={`${baseClasses} bg-main`}>
        <span>{workoutData.date}</span>
        <span>{workoutData.time}</span>
        <span>{workoutData.exercises}</span>
      </div>
    );
  }

  if (type === 'stat') {
    const statData = data as StatData;
    return (
      <div className={`${baseClasses} bg-stone`}>
        <span>{statData.type}</span>
        <span>{statData.time}</span>
        <span>{statData.count}</span>
      </div>
    );
  }

  return null;
}