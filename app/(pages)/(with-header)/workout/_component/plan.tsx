"use client";

import { useState } from 'react';
import Button from "@/app/_Components/Button/button";
import TableRow from "@/app/_Components/Workout/TableRow/tablerow";
import Add from "@/app/_Components/Workout/add/add";
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import { mockData, messages } from '@/app/MocData';
import type { ScheduledWorkout } from '@/app/index';
import AddWorkoutModal from '../_component/AddWorkout';

export default function ScheduledWorkouts() {
    const [workouts, setWorkouts] = useState<ScheduledWorkout[]>(mockData.scheduledWorkouts);
    const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
    const [showMessage, setShowMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Состояние для модального окна

    const handleEdit = (id: number) => {
        setShowMessage({ type: 'success', text: messages.success.workoutEdited });
        setTimeout(() => setShowMessage(null), 2000);
    };

    const handleDelete = (id: number) => {
        setWorkouts(workouts.filter(workout => workout.id !== id));
        setSelectedWorkouts(selectedWorkouts.filter(workoutId => workoutId !== id));
        setShowMessage({ type: 'success', text: messages.success.workoutDeleted });
        setTimeout(() => setShowMessage(null), 2000);
    };

    const handleAddWorkout = () => {
        // Этот обработчик больше не нужен, так как открываем модалку
        setIsAddModalOpen(true);
    };

    const handleSaveWorkout = (workoutData: any) => {
        console.log('Новая тренировка:', workoutData);
        // Здесь будет логика сохранения
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

    const toggleSelectAll = () => {
        if (selectedWorkouts.length === workouts.length) {
            setSelectedWorkouts([]);
        } else {
            setSelectedWorkouts(workouts.map(w => w.id));
        }
    };

    return (
        <div className=" mx-auto p-4">
            {showMessage && (
                <div className={`mb-4 p-3 rounded-2xl text-sm text-center ${showMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-500' : 'bg-warning/10 text-warning border border-warning'
                    }`}>
                    {showMessage.text}
                </div>
            )}

            <div className="flex flex-col items-center text-center justify-center mb-6">
                <h2 className="text-2xl font-bold text-primary">
                    Запланированные тренировки
                </h2>
            </div>

            <div className="space-y-6">
                {workouts.map((workout) => (
                    <div key={workout.id} className="bg-accent rounded-3xl p-5 shadow">
                        <div className="mb-3">
                            <div className="flex justify-between gap-3">
                                <Checkbox
                                    checked={selectedWorkouts.includes(workout.id)}
                                    onChange={() => toggleSelectWorkout(workout.id)}
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
                                        date: workout.date,
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
            </div>

            {/* Кнопка добавления тренировки (открывает модалку) */}
            <div className="mt-8" onClick={handleAddWorkout}>
                <Add  />
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