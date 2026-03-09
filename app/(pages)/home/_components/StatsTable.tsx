"use client";

import { useState } from 'react';
import TableRow from "../../../_Components/Workout/TableRow/tablerow";
import { statData as mockStatData } from '../../../MocData';
import type { StatData } from '../../../index';


export default function StatsTable() {
    const [statData, setStatData] = useState<StatData[]>(mockStatData);

    return (
        <div className='w-full'>
            <div className="bg-secondary rounded-3xl w-full text-white p-4 shadow mb-4">
                <h3 className="text-2xl flex justify-center mb-4 text-center">
                    Статистика упражнений
                </h3>

                <div className="flex justify-between nowrap gap-2 mb-2 text-xs px-2 sm:text-base">
                    <div>Тип</div>
                    <div>Общее время</div>
                    <div>Количество</div>
                </div>

                <div className="space-y-2 max-h-[464px] overflow-y-auto scrollbar-hide ">
                    {statData.map((item) => (
                        <TableRow
                            key={item.id}
                            type="stat"
                            data={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
