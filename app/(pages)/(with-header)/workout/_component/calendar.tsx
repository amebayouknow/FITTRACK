"use client";

import { useState } from 'react';
import Arrow from '@/app/_Components/Arrow/arrow';
import { ScheduledWorkout } from '@/app/index';

interface WorkoutCalendarProps {
    workouts?: ScheduledWorkout[];
    onDateSelect?: (date: string, workouts: ScheduledWorkout[]) => void;
    onWorkoutToggle?: (workoutId: number, completed: boolean) => void;
}

export default function WorkoutCalendar({ 
    workouts = [],
    onDateSelect,
    onWorkoutToggle
}: WorkoutCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const dateStr = `${String(day).padStart(2, '0')}.${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
        setSelectedDate(dateStr);
        
        const dayWorkouts = workouts.filter(w => w.date === dateStr);
        onDateSelect?.(dateStr, dayWorkouts);
    };

    const getWorkoutStatus = (day: number) => {
        const dateStr = `${String(day).padStart(2, '0')}.${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
        const dayWorkouts = workouts.filter(w => w.date === dateStr);
        
        if (dayWorkouts.length === 0) return 'none';
        
        const allCompleted = dayWorkouts.every(w => w.completed);
        
        if (allCompleted) return 'completed';
        return 'planned';
    };

    // Получаем день недели первого числа (0 - воскресенье, 1 - понедельник, ...)
    let startDay = firstDayOfMonth - 1;
    if (startDay < 0) startDay = 6;

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Заголовок с месяцем и стрелками */}
            <div className="flex items-center justify-between mb-4">
                <Arrow
                    direction="left"
                    size={24}
                    color="var(--color-primary)"
                    onClick={handlePrevMonth}
                />
                <h3 className="text-3xl text-primary">
                    {monthNames[currentMonth.getMonth()]}
                </h3>
                <Arrow
                    direction="right"
                    size={24}
                    color="var(--color-primary)"
                    onClick={handleNextMonth}
                />
            </div>

            {/* Дни недели */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day, index) => (
                    <div key={index} className="text-center text-sm font-medium text-secondary py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Ячейки календаря */}
            <div className="grid grid-cols-7 gap-2">
                {/* Пустые ячейки перед первым днем месяца */}
                {Array.from({ length: startDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Дни месяца */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const dateStr = `${String(day).padStart(2, '0')}.${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
                    const status = getWorkoutStatus(day);
                    const isSelected = selectedDate === dateStr;

                    let bgColor = '';
                    let indicator = null;

                    if (status === 'completed') {
                        bgColor = 'bg-lime-500 hover:bg-lime-600';
                        indicator = <span className="text-[8px] text-lime-200">✓</span>;
                    } else if (status === 'planned') {
                        bgColor = 'bg-accent/20 hover:bg-accent/30';
                        indicator = <span className="text-[8px] text-accent">●</span>;
                    }

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(day)}
                            className={`
                                 md:ring-1 md:ring-secondary aspect-square p-1 rounded-lg transition-all duration-200
                                ${bgColor}
                                ${isSelected ? 'ring-2 ring-accent ring-offset-2' : ''}
                                hover:scale-105
                            `}
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-sm font-medium">{day}</span>
                                {indicator}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}