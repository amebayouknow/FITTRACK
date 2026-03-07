"use client";

import ProgressRing from './_components/ProgressRing';
import StatsTable from './_components/StatsTable';
import WorkoutsTable from "./_components/WorkoutTable";

export default function HomePage() {
    return (
        <div className="min-h-screen px-2 py-9">
            <div className="max-w-xs mx-auto">
                <div className="px-2 py-4 text-center">
                    <h1 className="text-2xl">
                        Кардио не убивает.
                        <br />
                        Оно проверяет.
                    </h1>
                </div>
                <ProgressRing/>
                <div className='px-2'>
                        <StatsTable />
                        <WorkoutsTable />
                </div>
            </div>
        </div>
    );
}