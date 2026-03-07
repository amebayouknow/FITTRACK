"use client";

import { WorkoutData, StatData, TableRowType } from '../../../index';

interface TableRowProps {
  data: WorkoutData | StatData;
  type?: TableRowType;
}

export default function TableRow({ data, type = 'workout' }: TableRowProps) {
  const baseClasses = "flex justify-between px-5 py-4 mb-2 rounded-[16px] text-sm";
  
  if (type === 'workout') {
    const workoutData = data as WorkoutData;
    return (
      <div className={`${baseClasses} bg-stone text-black`}>
        <span>{workoutData.date}</span>
        <span>{workoutData.time}</span>
        <span>{workoutData.exercises}</span>
      </div>
    );
  }

  if (type === 'workout-alt') {
    const workoutData = data as WorkoutData;
    return (
      <div className={`${baseClasses} bg-[#e5e7eb] text-[#212529]`}>
        <span>{workoutData.date}</span>
        <span>{workoutData.time}</span>
        <span>{workoutData.exercises}</span>
      </div>
    );
  }

  if (type === 'stat') {
    const statData = data as StatData;
    return (
      <div className={`${baseClasses} bg-stone text-black`}>
        <span>{statData.type}</span>
        <span>{statData.time}</span>
        <span>{statData.count}</span>
      </div>
    );
  }

  return null;
}