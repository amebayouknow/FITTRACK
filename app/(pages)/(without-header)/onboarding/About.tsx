"use client";

import Logo from "@/app/_Components/Logo/logo";
import { aboutData } from '@/app/MocData';

interface AboutProps {
    currentSlide: number;
}

export default function About({ currentSlide }: AboutProps) {
    const data = aboutData[currentSlide];

    return (
        <div className="absolute p-8 left-0 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-md w-full pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-4xl shadow-lg pointer-events-auto">
                <div className="mb-4">
                    <Logo disableLink={true} />
                </div>
                <p className="text-base text-primary leading-relaxed mb-6 text-center sm:text-left">
                    {data.description}
                </p>
                <div className="relative h-8 w-full flex justify-start">
                    <div className={`absolute top-1/2 ${data.accentWidth} h-1 bg-accent`}></div>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${data.warningWidth} h-1 bg-warning z-10`}></div>
                </div>
            </div>
        </div>
    );
}