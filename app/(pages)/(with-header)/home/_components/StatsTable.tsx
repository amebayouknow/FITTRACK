"use client";

import { useState } from 'react';
import TableRow from "../../../../_Components/Workout/TableRow/tablerow";
import { statData as mockStatData } from '../../../../MocData';
import type { StatData } from '../../../../index';

export default function StatsTable() {
    const [statData] = useState<StatData[]>(mockStatData);

    return (
        <div className="w-full">
            <div className="bg-secondary rounded-3xl w-full text-white p-4 sm:p-5 md:p-6 shadow mb-4">
                <h3 className="text-xl sm:text-2xl flex justify-center mb-4 sm:mb-5 text-center">
                    Статистика упражнений
                </h3>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm px-2">
                    <div className="text-left">Тип</div>
                    <div className="text-center">Общее время</div>
                    <div className="text-right">Количество</div>
                </div>

                <div className="space-y-2 max-h-[474px] overflow-y-auto scrollbar-hide">
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