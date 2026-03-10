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
export type PeriodType = 'month' | 'twoMonths' | 'quarter';
export type CategoryType = 'all' | 'cardio' | 'strength' | 'stretching';

export interface WorkoutData {
    id: number;
    date: string;
    time: string;
    exercises: string;
    category: 'cardio' | 'strength' | 'stretching';
    duration: number;
    exercisesCount: number;
}

export interface StatData {
    id: number;
    type: string;
    time: string;
    count: string;
    category: 'cardio' | 'strength' | 'stretching';
}

export type TableRowType = 'workout' | 'stat' | 'workout-alt';