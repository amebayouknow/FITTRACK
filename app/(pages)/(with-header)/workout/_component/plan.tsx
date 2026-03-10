"use client";

import { useState } from 'react';
import Button from "@/app/_Components/Button/button";
import TableRow from "@/app/_Components/Workout/TableRow/tablerow";
import Add from "@/app/_Components/Workout/add/add";
import Checkbox from "@/app/_Components/Checkbox/checkbox";

interface ScheduledWorkout {
    id: number;
    date: string;
    time: string;
    exercises: Array<{
        id: number;
        name: string;
        type: string;
    }>;
}

export default function ScheduledWorkouts() {
    const [workouts, setWorkouts] = useState<ScheduledWorkout[]>([
        {
            id: 1,
            date: '02.03',
            time: '56 мин',
            exercises: [
                { id: 1, name: 'бег', type: 'бег' },
                { id: 2, name: 'растяжка', type: 'растяжка' },
                { id: 3, name: 'борьба', type: 'борьба' },
            ]
        }
    ]);

    const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);

    const handleEdit = (id: number) => {
        console.log('Редактировать тренировку:', id);
        // Здесь будет логика редактирования
    };

    const handleDelete = (id: number) => {
        setWorkouts(workouts.filter(workout => workout.id !== id));
        setSelectedWorkouts(selectedWorkouts.filter(workoutId => workoutId !== id));
    };

    const handleAddWorkout = () => {
        console.log('Добавить тренировку');
        // Здесь будет логика добавления
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
        <div className="max-w-2xl mx-auto p-4">
            {/* Заголовок с чекбоксом "Выбрать все" */}
            <div className="flex items-center justify-center mb-6">
                <h2 className="text-2xl font-bold text-primary">
                    Запланированные тренировки
                </h2>
            </div>

            <div className="space-y-6">
                {workouts.map((workout) => (
                    <div key={workout.id} className="bg-accent rounded-3xl p-5 shadow">
                        <div className="mb-3">
                            <div className="flex items-center justify-between gap-3">
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

                        <div className="flex justify-end gap-3">
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

            {/* Компонент добавления тренировки */}
            <div className="mt-8">
                <Add />
            </div>
        </div>
    );
}