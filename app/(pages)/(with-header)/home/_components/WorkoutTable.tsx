"use client";

import { useState, useEffect } from 'react';
import TableRow from "../../../../_Components/Workout/TableRow/tablerow";
import { workoutData as mockWorkoutData } from '../../../../MocData';
import Button from '../../../../_Components/Button/button';
import type { WorkoutData } from '../../../../index';

export default function WorkoutTable() {
    const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setWorkoutData(mockWorkoutData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="flex justify-center p-8">Загрузка...</div>;
    }

    return (
        <div className="w-full">
            <div className="bg-secondary rounded-3xl w-full text-white p-4 sm:p-5 md:p-6 shadow mb-4">
                <h3 className="text-xl sm:text-2xl flex justify-center mb-4 sm:mb-5 text-center">
                    Последние тренировки
                </h3>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm px-2">
                    <div className="text-left">Дата</div>
                    <div className="text-center">Общее время</div>
                    <div className="text-right">Количество</div>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                    {workoutData.map((item) => (
                        <TableRow
                            key={item.id}
                            type="workout"
                            data={item}
                        />
                    ))}
                </div>

                <div className='flex justify-center mt-4 sm:mt-5'>
                    <Button
                        text="Смотреть отчет"
                        variant="primary"
                        href='/report'
                    />
                </div>
            </div>
        </div>
    );
}