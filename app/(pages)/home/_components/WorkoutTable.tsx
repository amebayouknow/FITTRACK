"use client";

import { useState, useEffect } from 'react';
import TableRow from "../../../_Components/Workout/TableRow/tablerow";
import { workoutData as mockWorkoutData, statData as mockStatData } from '../../../MocData';
import Button from '../../../_Components/Button/button';
import type { WorkoutData, StatData } from '../../../index';

export default function WorkoutTable() {
    const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
    const [statData, setStatData] = useState<StatData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setWorkoutData(mockWorkoutData);
                setStatData(mockStatData);
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
        <div >
            <div className="bg-secondary rounded-[24px] w-full text-white p-4 shadow mb-4">
                <h3 className="text-2xl flex justify-center mb-4 text-center">
                    Последние тренировки
                </h3>

                <div className="flex justify-between nowrap gap-2 mb-2 text-xs px-2">
                    <div>Дата</div>
                    <div>Общее время</div>
                    <div>Количество</div>
                </div>

                {workoutData.map((item) => (
                    <TableRow
                        key={item.id}
                        type="workout"
                        data={item}
                    />
                ))}
                <div className='flex flex-center'>
                    <Button
                        text="Смотреть отчет"
                        variant="primary"
                    />
                </div>
            </div>
        </div>
    );
}