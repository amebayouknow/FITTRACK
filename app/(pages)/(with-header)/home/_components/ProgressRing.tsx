"use client";

import { useState, useEffect } from 'react';
import Button from '@/app/_Components/Button/button';

interface ProgressRingProps {
    completed?: number;
    total?: number;
    size?: number;
    strokeWidth?: number;
    innerCircleSize?: number;
}

export default function ProgressRing({ completed = 5, total = 4, size = 250, strokeWidth = 20, innerCircleSize = 150 }: ProgressRingProps) {
    const [progress, setProgress] = useState(0);
    const [overProgress, setOverProgress] = useState(0);

    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const normalProgress = Math.min(completed / total, 1);
    const overProgressValue = completed > total ? (completed - total) / total : 0;

    useEffect(() => {
        setProgress(normalProgress);
        setOverProgress(overProgressValue);
    }, [normalProgress, overProgressValue, completed, total]);

    const normalOffset = circumference * (1 - progress);
    const overOffset = circumference * (1 - overProgress);

    return (
        <div className='flex flex-col items-center rounded-3xl'>
            <div className='relative mb-3' style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className='absolute top-0 left-0 -rotate-90 overflow-visible'
                >
                    <circle
                        className='stroke-secondary'
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill='transparent'
                    />

                    <circle
                        className='stroke-accent transition-all duration-800 ease-in-out'
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill='transparent'
                        strokeDasharray={circumference}
                        strokeDashoffset={normalOffset}
                        strokeLinecap='round'
                        style={{
                            transition: 'stroke-dashoffset 0.8s ease'
                        }}
                    />

                    {overProgress > 0 && (
                        <circle
                            className='stroke-warning transition-all duration-800 ease-in-out'
                            cx={center}
                            cy={center}
                            r={radius}
                            strokeWidth={strokeWidth}
                            fill='transparent'
                            strokeDasharray={circumference}
                            strokeDashoffset={overOffset}
                            strokeLinecap='round'
                            transform={`rotate(${360 * progress} ${center} ${center})`}
                            style={{
                                transition: 'stroke-dashoffset 0.8s ease',
                                animation: 'red-pulse 3s infinite'
                            }}
                        />
                    )}
                </svg>

                <div
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone rounded-full flex flex-col flex-center z-10 shadow-custom animate-pulse-border'
                    style={{
                        width: innerCircleSize,
                        height: innerCircleSize,
                    }}
                >
                    <span className='text-5xl text-primary'>{completed}/{total}</span>
                </div>
            </div>
            <Button
                text='Добавить тренировку'
                variant='primary'
            />
        </div>
    );
}