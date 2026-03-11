"use client";

import { useState, useEffect } from 'react';
import WorkoutCalendar from './_component/calendar';
import ScheduledWorkouts from './_component/plan';
import { mockData } from '@/app/MocData';
import type { ScheduledWorkout } from '@/app/index';
import ExportButton from '../report/_components/ExportButton/ExportButton';

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<ScheduledWorkout[]>(mockData.scheduledWorkouts);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState<ScheduledWorkout[]>([]);

  // Загружаем сохраненные статусы тренировок из localStorage
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workoutStatuses');
    if (savedWorkouts) {
      const statuses = JSON.parse(savedWorkouts);
      setWorkouts(prev => prev.map(w => ({
        ...w,
        completed: statuses[w.id] || false
      })));
    }
  }, []);

  const handleDateSelect = (date: string, dayWorkouts: ScheduledWorkout[]) => {
    setSelectedDate(date);
    setFilteredWorkouts(dayWorkouts);
  };

  const handleWorkoutToggle = (workoutId: number, completed: boolean) => {
    // Обновляем статус в общем списке
    const updatedWorkouts = workouts.map(w =>
      w.id === workoutId ? { ...w, completed } : w
    );
    setWorkouts(updatedWorkouts);

    // Обновляем отфильтрованный список
    setFilteredWorkouts(prev =>
      prev.map(w => w.id === workoutId ? { ...w, completed } : w)
    );

    // Сохраняем в localStorage
    const statuses = updatedWorkouts.reduce((acc, w) => {
      acc[w.id] = w.completed || false;
      return acc;
    }, {} as Record<number, boolean>);
    localStorage.setItem('workoutStatuses', JSON.stringify(statuses));
  };

  return (
    <div className="wrapper min-h-screen bg-main">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка - календарь */}
          <div className="lg:w-2/4">
            <div className="rounded-3xl">
              <WorkoutCalendar
                workouts={workouts}
                onDateSelect={handleDateSelect}
                onWorkoutToggle={handleWorkoutToggle}
              />
            </div>
          </div>

          {/* Правая колонка - запланированные тренировки */}
          <div className="lg:w-2/4">
            {selectedDate ? (
              <ScheduledWorkouts
                workouts={filteredWorkouts}
                onWorkoutToggle={handleWorkoutToggle}
              />
            ) : (
              <div className="bg-stone rounded-3xl p-12 text-center h-full flex items-center justify-center">
                <p className="text-secondary text-lg">
                  Выберите дату в календаре
                </p>
              </div>
            )}
            <div className="mt-4 lg:mt-10 lg:flex-shrink-0">
              <ExportButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
