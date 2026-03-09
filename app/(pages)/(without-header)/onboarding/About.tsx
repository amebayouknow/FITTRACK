export default function About() {
    return (
        <div className="absolute left-20 top-1/2 -translate-y-1/2 z-20 max-w-md w-full pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-4xl shadow-lg pointer-events-auto">
                <h1 className="text-5xl mb-4">
                    <span className="text-accent">Fit</span>rack
                </h1>
                <p className="text-base text-primary leading-relaxed mb-6">
                    Следи за нагрузкой, ставь рекорды и смотри на свою форму в цифрах.
                    Мы превратим сухие данные в твои достижения.
                </p>
                <div className="relative h-8 w-full flex justify-end">
                    <div className="absolute right-0 top-1/2 w-48 h-1 bg-accent"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-1 bg-warning z-10"></div>
                </div>
            </div>
        </div>
    );
}