import { WorkoutData, StatData } from './index';

export const workoutData: WorkoutData[] = [
    { id: 1, date: '02.03', time: '56 мин', exercises: '4 упражнения' },
    { id: 2, date: '02.03', time: '56 мин', exercises: '4 упражнения' },
    { id: 3, date: '02.03', time: '56 мин', exercises: '4 упражнения' },
    { id: 4, date: '02.03', time: '56 мин', exercises: '4 упражнения' },
    { id: 5, date: '02.03', time: '56 мин', exercises: '4 упражнения' },
    { id: 6, date: '02.03', time: '56 мин', exercises: '4 упражнения' },
];

export const statData: StatData[] = [
    { id: 1, type: 'бег', time: '56 мин', count: '4 упражнения' },
    { id: 2, type: 'бег', time: '56 мин', count: '4 упражнения' },
    { id: 3, type: 'бег', time: '56 мин', count: '4 упражнения' },
    { id: 4, type: 'бег', time: '56 мин', count: '4 упражнения' },
    { id: 5, type: 'бег', time: '56 мин', count: '4 упражнения' },
    { id: 6, type: 'бег', time: '56 мин', count: '4 упражнения' },
    { id: 7, type: 'бег', time: '56 мин', count: '4 упражнения' },
];

export const fetchWorkoutData = async (): Promise<WorkoutData[]> => {

    return workoutData;
};

export const fetchStatData = async (): Promise<StatData[]> => {

    return statData;
};