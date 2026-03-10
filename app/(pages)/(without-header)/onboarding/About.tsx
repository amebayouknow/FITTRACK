"use client";

import Logo from "@/app/_Components/Logo/logo";

interface AboutProps {
    currentSlide: number;
}

export default function About({ currentSlide }: AboutProps) {
    const aboutData = [
        {
            description: "Следи за нагрузкой, ставь рекорды и смотри на свою форму в цифрах. Мы превратим сухие данные в твои достижения.",
            accentWidth: "w-full",
            warningWidth: "w-32"
        },
        {
            description: "Отслеживай свои тренировки, устанавливай новые рекорды и наблюдай за улучшением своих результатов день за днем.",
            accentWidth: "w-full",
            warningWidth: "w-32"
        },
        {
            description: "Получай персональные рекомендации на основе твоих данных. Наша система поможет тебе достичь целей быстрее и эффективнее.",
            accentWidth: "w-full",
            warningWidth: "w-32"
        }
    ];

    const data = aboutData[currentSlide];

    return (
        <div className="absolute p-8 left-0 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-md w-full pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-4xl shadow-lg pointer-events-auto">
                <Logo disableLink={true}/>
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