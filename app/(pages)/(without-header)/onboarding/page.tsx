"use client";

import { useState } from 'react';
import About from "./About";
import Arrow from "@/app/_Components/Arrow/arrow";
import Button from "@/app/_Components/Button/button";
import Image from 'next/image';
import { onboardingSlides } from '@/app/MocData';

export default function OnboardingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = onboardingSlides;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <main className="min-h-screen bg-main">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="relative mb-6">
                    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-custom">
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].alt}
                            fill
                            className="object-cover"
                            priority
                        />
                        <About currentSlide={currentSlide} />
                    </div>

                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
                        <Arrow
                            direction="left"
                            size={40}
                            color="gray"
                            onClick={prevSlide}
                        />
                    </div>

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
                        <Arrow
                            direction="right"
                            size={40}
                            color="gray"
                            onClick={nextSlide}
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-3 mb-8">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${index === currentSlide
                                ? 'bg-warning scale-125'
                                : 'bg-secondary/30 hover:bg-secondary/50'
                                }`}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto p-2">
                    <Button
                        text="Вход"
                        variant="outline"
                        href="/auth/sign-in"
                        className="w-full sm:w-auto shadow-md"
                    />
                    <Button
                        text="Регистрация"
                        variant="primary"
                        href="/auth/sign-up"
                        className="w-full sm:w-auto shadow-md"
                    />
                </div>
            </div>
        </main>
    );
}