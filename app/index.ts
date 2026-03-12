// Типы для пользователя
export interface User {
    id: number;
    email: string;
    name: string;
    password?: string;
    createdAt: string;
}

// Типы для тренировок
export interface WorkoutData {
    id: number;
    date: string;
    time: string;
    exercises: string;
    category: 'cardio' | 'strength' | 'stretching';
    duration: number;
    exercisesCount: number;
}

// Типы для статистики
export interface StatData {
    id: number;
    type: string;
    time: string;
    count: string;
    category: 'cardio' | 'strength' | 'stretching';
}

// Типы для отчетов
export interface ReportData {
    totalWorkouts: number;
    totalTime: number;
    totalExercises: number;
    byCategory: {
        cardio: number;
        strength: number;
        stretching: number;
    };
    weeklyData: {
        labels: string[];
        current: number[];
        previous?: number[];
    };
    monthlyData: {
        labels: string[];
        current: number[];
        previous?: number[];
    };
}

// Типы для фильтров
export type ReportType = 'simple' | 'comparative';
export type PeriodType = 'month' | 'twoMonths'; // удален 'quarter'
export type CategoryType = 'all' | 'cardio' | 'strength' | 'stretching';

export type TableRowType = 'workout' | 'stat' | 'workout-alt';

// Типы для запланированных тренировок
export interface ScheduledExercise {
    id: number;
    name: string;
    type: string;
}

export interface ScheduledWorkout {
    id: number;
    date: string;
    time: string;
    exercises: ScheduledExercise[];
}

// Типы для онбординга
export interface OnboardingSlide {
    id: number;
    image: string;
    alt: string;
}

export interface AboutData {
    description: string;
    accentWidth: string;
    warningWidth: string;
}

// Типы для сообщений
export interface Message {
    success: string;
    error: string;
    info: string;
    warning: string;
}

export interface ScheduledExercise {
    id: number;
    name: string;
    type: string;
}

export interface ScheduledWorkout {
    id: number;
    date: string;
    time: string;
    exercises: ScheduledExercise[];
    completed?: boolean;
}