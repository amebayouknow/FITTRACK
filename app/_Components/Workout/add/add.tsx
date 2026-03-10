export default function Add() {
    return (
        <div className="flex justify-between items-center text-accent px-3 py-3 rounded-[16px] mb-2 shadow border-2 border-dashed border-bg-accent">
            <span className="exercises-cell date">Добавить тренировку</span>
            <div className="w-8 h-8 rounded-full border-2 text-accent flex items-center justify-center shadow">
                <span className="text-accent text-xl font-bold leading-none">+</span>
            </div>
        </div>
    );
}