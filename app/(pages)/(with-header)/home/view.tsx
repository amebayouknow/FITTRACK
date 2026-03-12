"use client";

import ProgressRing from "./_components/ProgressRing";
import StatsTable from "./_components/StatsTable";
import WorkoutTable from "./_components/WorkoutTable";

export default function View(){
        return (
            <div className="min-h-screen px-2 sm:px-4 py-9">
                <div className="xs:max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto ">
                    
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl md:text-3xl mb-4 px-2">
                            Кардио не убивает. Оно проверяет.
                        </h1>
                    </div>
                    
                    <div className="flex justify-center mb-6 sm:mb-8 lg:hidden">
                        <ProgressRing />
                    </div>
                    
                    <div className='w-full space-y-4 sm:space-y-6 md:flex md:flex-row-reverse md:justify-between md:gap-6 md:space-y-0 lg:items-stretch xl:gap-15'>
                        
                        <div className='md:flex-1'>
                            <StatsTable />
                        </div>
                        
                        <div className='hidden lg:flex lg:justify-center lg:flex-shrink-0 lg:items-center'>
                            <ProgressRing />
                        </div>
                        
                        <div className='md:flex-1'>
                            <WorkoutTable />
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        );
}