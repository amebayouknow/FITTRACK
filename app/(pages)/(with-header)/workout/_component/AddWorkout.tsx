"use client";

import { useState } from 'react';
import Button from '@/app/_Components/Button/button';
import InputField from '@/app/_Components/Input/input';
import Add from '@/app/_Components/Workout/add/add';
import TableRow from '@/app/_Components/Workout/TableRow/tablerow';
import { mockData } from '@/app/MocData';

interface Exercise {
    id: number;
    name: string;
    duration: string;
    distance: string;
}

interface AddWorkoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (workoutData: any) => void;
    selectedDate?: string;
    selectedTime?: string;
}

// Получаем уникальные названия упражнений из mockData
const getUniqueExercises = () => {
    const exerciseNames: string[] = [];
    
    // Из тренировок (берем exercises, но парсим только название)
    mockData.workouts.forEach(w => {
        // В exercises может быть "4 упражнения", нам нужно только название
        // Например из "бег" или "4 упражнения" мы берем то, что есть
        const exerciseName = w.exercises;
        if (exerciseName && !exerciseNames.includes(exerciseName) && 
            !exerciseName.includes('упражн') && exerciseName.length < 20) {
            exerciseNames.push(exerciseName);
        }
    });
    
    // Из статистики
    mockData.stats.forEach(s => {
        if (s.type && !exerciseNames.includes(s.type)) {
            exerciseNames.push(s.type);
        }
    });
    
    // Добавляем базовые упражнения, если список пуст
    if (exerciseNames.length === 0) {
        exerciseNames.push('Бег', 'Растяжка', 'Приседания', 'Отжимания', 'Планка');
    }
    
    return exerciseNames.sort();
};

export default function AddWorkoutModal({ 
    isOpen, 
    onClose, 
    onSave,
    selectedDate = '02.03',
    selectedTime = '56 мин'
}: AddWorkoutModalProps) {
    const [exercises, setExercises] = useState<Exercise[]>([
        { id: 1, name: 'Бег', duration: '56 мин', distance: '6 км' },
        { id: 2, name: 'Растяжка', duration: '56 мин', distance: '4 подхода' },
    ]);
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [isCustomExercise, setIsCustomExercise] = useState(false);
    const [newExerciseName, setNewExerciseName] = useState('');
    const [newExerciseDuration, setNewExerciseDuration] = useState('');
    const [newExerciseDistance, setNewExerciseDistance] = useState('');

    // Получаем список упражнений из существующих данных
    const existingExercises = getUniqueExercises();

    if (!isOpen) return null;

    const handleAddExercise = () => {
        setShowAddForm(true);
        setIsCustomExercise(false);
        setNewExerciseName('');
    };

    const handleSelectCategory = (category: string) => {
        setNewExerciseName(category);
        setIsCustomExercise(false);
        setShowCategoryDropdown(false);
    };

    const handleAddCustomExercise = () => {
        if (newExerciseName && newExerciseDuration && newExerciseDistance) {
            const newExercise: Exercise = {
                id: Date.now(),
                name: newExerciseName,
                duration: newExerciseDuration,
                distance: newExerciseDistance
            };
            setExercises([...exercises, newExercise]);
            setShowAddForm(false);
            setShowCategoryDropdown(false);
            setIsCustomExercise(false);
            setNewExerciseName('');
            setNewExerciseDuration('');
            setNewExerciseDistance('');
        }
    };

    const handleRemoveExercise = (id: number) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const handleSave = () => {
        onSave({
            date: selectedDate,
            time: selectedTime,
            exercises
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 lg:max-w-5lx">
            <div className="bg-stone rounded-3xl max-w-5xl max-h-[90vh] overflow-y-auto">
                <h1 className='flex flex-center text-center text-3xl p-5 text-accent'>Новая Тренировка</h1>
                {/* Дата и время сверху */}
                <div className="p-6 border-b border-secondary/20">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 flex justify-between items-center bg-white p-4 rounded-2xl">
                            <span className="text-primary font-medium">Дата</span>
                            <span className="text-accent font-semibold">{selectedDate}</span>
                        </div>
                        
                        <div className="flex-1 flex justify-between items-center bg-white p-4 rounded-2xl">
                            <span className="text-primary font-medium">Время</span>
                            <span className="text-accent font-semibold">{selectedTime}</span>
                        </div>
                    </div>
                </div>

                {/* Контент */}
                <div className="p-6 space-y-6">

                    {/* Список упражнений через TableRow workout-alt */}
                    <div className="space-y-2">
                        {exercises.map((exercise) => (
                            <div key={exercise.id} className="relative group">
                                <TableRow
                                    type="workout-alt"
                                    data={{
                                        date: exercise.name,
                                        time: exercise.duration,
                                        exercises: exercise.distance,
                                        id: exercise.id,
                                        category: 'strength',
                                        duration: parseInt(exercise.duration) || 30,
                                        exercisesCount: 1
                                    }}
                                />
                                <button
                                    onClick={() => handleRemoveExercise(exercise.id)}
                                    className="absolute -right-2 -top-2 w-6 h-6 bg-warning text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Форма добавления упражнения */}
                    {showAddForm ? (
                        <div className="flex flex-col p-4 space-y-3">
                            {/* Поле упражнения с выпадающим списком из существующих упражнений */}
                            <div className="relative">
                                <div className="w-full border-2 border-accent rounded-2xl px-7 py-3 text-left text-primary bg-white cursor-pointer flex items-center justify-between"
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                >
                                    <span className={newExerciseName ? 'text-primary' : 'text-secondary'}>
                                        {newExerciseName || 'Выберите упражнение'}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 text-accent transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {/* Выпадающий список существующих упражнений */}
                                {showCategoryDropdown && (
                                    <div className="absolute z-10 mt-2 w-full bg-white rounded-2xl border-2 border-accent shadow-lg overflow-hidden">
                                        <div className="max-h-60 overflow-y-auto">
                                            {existingExercises.map((exercise, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSelectCategory(exercise)}
                                                    className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors border-b border-secondary/10 last:border-0"
                                                >
                                                    {exercise}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    setIsCustomExercise(true);
                                                    setNewExerciseName('');
                                                    setShowCategoryDropdown(false);
                                                }}
                                                className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors bg-accent/5 font-medium text-accent border-t border-secondary/10"
                                            >
                                                + Ввести свое упражнение
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Поле для своего упражнения (появляется при выборе "Ввести свое упражнение") */}
                            {isCustomExercise && (
                                <InputField
                                    type="text"
                                    hint="Введите название упражнения"
                                    value={newExerciseName}
                                    onChange={(e) => setNewExerciseName(e.target.value)}
                                />
                            )}

                            {/* Поля длительности и дистанции */}
                            <div className="flex flex-col md:flex-row gap-2">
                                <InputField
                                    type="text"
                                    hint="Длительность"
                                    value={newExerciseDuration}
                                    onChange={(e) => setNewExerciseDuration(e.target.value)}
                                />
                                <InputField
                                    type="text"
                                    hint="Кол-во/дист."
                                    value={newExerciseDistance}
                                    onChange={(e) => setNewExerciseDistance(e.target.value)}
                                />
                            </div>

                            {/* Кнопки */}
                            <div className="flex flex-col md:flex-row gap-2 pt-2">
                                <Button
                                    text="Добавить"
                                    variant="primary"
                                    onClick={handleAddCustomExercise}
                                />
                                <Button
                                    text="Отмена"
                                    variant="text"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setShowCategoryDropdown(false);
                                        setIsCustomExercise(false);
                                        setNewExerciseName('');
                                        setNewExerciseDuration('');
                                        setNewExerciseDistance('');
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div onClick={handleAddExercise} className="cursor-pointer">
                            <Add  />
                        </div>
                    )}
                </div>

                {/* Кнопки Сохранить/Отмена */}
                <div className="flex flex-col md:flex-row p-6 border-t border-secondary/20 flex gap-3">
                    <div className="flex-1">
                        <Button
                            text="Отмена"
                            variant="outline"
                            onClick={onClose}
                        />
                    </div>
                    <div className="flex-1">
                        <Button
                            text="Сохранить"
                            variant="primary"
                            onClick={handleSave}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}