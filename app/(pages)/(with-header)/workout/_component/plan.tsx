"use client";

import { useState, useEffect } from 'react';
import Button from "@/app/_Components/Button/button";
import TableRow from "@/app/_Components/Workout/TableRow/tablerow";
import Add from "@/app/_Components/Workout/add/add";
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import { messages } from '@/app/MocData';
import type { ScheduledWorkout } from '@/app/index';
import AddWorkoutModal from './AddWorkout';

interface ScheduledWorkoutsProps {
    workouts?: ScheduledWorkout[];
    onWorkoutToggle?: (workoutId: number, completed: boolean) => void;
}

export default function ScheduledWorkouts({ 
    workouts = [],
    onWorkoutToggle 
}: ScheduledWorkoutsProps) {
    const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
    const [showMessage, setShowMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [localWorkouts, setLocalWorkouts] = useState<ScheduledWorkout[]>(workouts);

    // Синхронизируем локальное состояние при изменении пропсов
    useEffect(() => {
        setLocalWorkouts(workouts);
    }, [workouts]);

    const handleEdit = (id: number) => {
        setShowMessage({ type: 'success', text: messages.success.workoutEdited });
        setTimeout(() => setShowMessage(null), 2000);
    };

    const handleDelete = (id: number) => {
        setLocalWorkouts(prev => prev.filter(w => w.id !== id));
        setShowMessage({ type: 'success', text: messages.success.workoutDeleted });
        setTimeout(() => setShowMessage(null), 2000);
    };

    const handleAddWorkout = () => {
        setIsAddModalOpen(true);
    };

    const handleSaveWorkout = (workoutData: any) => {
        console.log('Новая тренировка:', workoutData);
        setShowMessage({ type: 'success', text: messages.success.workoutAdded });
        setTimeout(() => setShowMessage(null), 2000);
    };

    const toggleSelectWorkout = (id: number) => {
        if (selectedWorkouts.includes(id)) {
            setSelectedWorkouts(selectedWorkouts.filter(workoutId => workoutId !== id));
        } else {
            setSelectedWorkouts([...selectedWorkouts, id]);
        }
    };

    const handleWorkoutComplete = (id: number, completed: boolean) => {
        // Обновляем локальное состояние
        setLocalWorkouts(prev =>
            prev.map(w => w.id === id ? { ...w, completed } : w)
        );
        // Передаем изменение в родительский компонент
        onWorkoutToggle?.(id, completed);
        
        // Если тренировка отмечена как выполненная, убираем ее из выбранных
        if (completed && selectedWorkouts.includes(id)) {
            setSelectedWorkouts(selectedWorkouts.filter(workoutId => workoutId !== id));
        }
    };

    if (localWorkouts.length === 0) {
        return (
            <div className="bg-stone rounded-3xl p-8 text-center">
                <p className="text-secondary mb-4">На этот день нет запланированных тренировок</p>
                <div onClick={handleAddWorkout} className="cursor-pointer inline-block">
                    <Add />
                </div>
                
                <AddWorkoutModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleSaveWorkout}
                    selectedDate="02.03"
                    selectedTime="56 мин"
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {showMessage && (
                <div className={`mb-4 p-3 rounded-2xl text-sm text-center ${
                    showMessage.type === 'success' 
                        ? 'bg-green-100 text-green-700 border border-green-500' 
                        : 'bg-warning/10 text-warning border border-warning'
                }`}>
                    {showMessage.text}
                </div>
            )}

            {localWorkouts.map((workout) => (
                <div 
                    key={workout.id} 
                    className={`
                        rounded-3xl p-5 shadow transition-all duration-300
                        ${workout.completed ? 'bg-lime-500' : 'bg-accent'}
                    `}
                >
                    <div className="mb-3">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={workout.completed || false}
                                onChange={(checked) => handleWorkoutComplete(workout.id, checked)}
                            />
                            <h3 className="text-2xl font-semibold text-white">
                                Тренировка {workout.date}
                            </h3>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        {workout.exercises.map((exercise) => (
                            <TableRow
                                key={exercise.id}
                                type="workout-alt"
                                data={{
                                    date: exercise.name,
                                    time: workout.time,
                                    exercises: exercise.type,
                                    id: exercise.id,
                                    category: 'strength',
                                    duration: parseInt(workout.time) || 0,
                                    exercisesCount: 1
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-end gap-3">
                        <Button
                            text="Редактировать"
                            variant="outlinewhite"
                            onClick={() => handleEdit(workout.id)}
                        />
                        <Button
                            text="Удалить"
                            variant="secondary"
                            onClick={() => handleDelete(workout.id)}
                        />
                    </div>
                </div>
            ))}

            {/* Кнопка добавления тренировки */}
            <div className="mt-6 cursor-pointer" onClick={handleAddWorkout}>
                <Add />
            </div>

            {/* Модальное окно добавления тренировки */}
            <AddWorkoutModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveWorkout}
                selectedDate="02.03"
                selectedTime="56 мин"
            />
        </div>
    );
}