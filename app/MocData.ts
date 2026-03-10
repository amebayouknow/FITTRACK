import { 
    WorkoutData, StatData, ReportData, User, 
    ScheduledWorkout, OnboardingSlide, AboutData,
    CategoryType 
} from './index';

// Пользователи
export const mockUsers: User[] = [
    {
        id: 1,
        email: 'user@example.com',
        name: 'Мусция',
        password: 'password123',
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        email: 'test@test.com',
        name: 'Тестовый пользователь',
        password: 'test123',
        createdAt: '2024-02-20'
    }
];

// Тренировки
export const mockWorkouts: WorkoutData[] = [
    { id: 1, date: '02.03', time: '56 мин', exercises: '4 упражнения', category: 'cardio', duration: 56, exercisesCount: 4 },
    { id: 2, date: '04.03', time: '45 мин', exercises: '3 упражнения', category: 'cardio', duration: 45, exercisesCount: 3 },
    { id: 3, date: '06.03', time: '60 мин', exercises: '5 упражнений', category: 'cardio', duration: 60, exercisesCount: 5 },
    { id: 4, date: '08.03', time: '50 мин', exercises: '4 упражнения', category: 'cardio', duration: 50, exercisesCount: 4 },
    { id: 5, date: '03.03', time: '70 мин', exercises: '8 упражнений', category: 'strength', duration: 70, exercisesCount: 8 },
    { id: 6, date: '05.03', time: '65 мин', exercises: '7 упражнений', category: 'strength', duration: 65, exercisesCount: 7 },
    { id: 7, date: '07.03', time: '80 мин', exercises: '9 упражнений', category: 'strength', duration: 80, exercisesCount: 9 },
    { id: 8, date: '09.03', time: '55 мин', exercises: '6 упражнений', category: 'strength', duration: 55, exercisesCount: 6 },
    { id: 9, date: '01.03', time: '30 мин', exercises: '5 упражнений', category: 'stretching', duration: 30, exercisesCount: 5 },
    { id: 10, date: '03.03', time: '25 мин', exercises: '4 упражнения', category: 'stretching', duration: 25, exercisesCount: 4 },
    { id: 11, date: '06.03', time: '35 мин', exercises: '6 упражнений', category: 'stretching', duration: 35, exercisesCount: 6 },
    { id: 12, date: '09.03', time: '20 мин', exercises: '3 упражнения', category: 'stretching', duration: 20, exercisesCount: 3 },
];

// Статистика по категориям
export const mockStats: StatData[] = [
    { id: 1, type: 'бег', time: '56 мин', count: '4 упражнения', category: 'cardio' },
    { id: 2, type: 'велосипед', time: '45 мин', count: '3 упражнения', category: 'cardio' },
    { id: 3, type: 'скакалка', time: '15 мин', count: '2 упражнения', category: 'cardio' },
    { id: 4, type: 'приседания', time: '30 мин', count: '4 упражнения', category: 'strength' },
    { id: 5, type: 'отжимания', time: '20 мин', count: '3 упражнения', category: 'strength' },
    { id: 6, type: 'тяга', time: '25 мин', count: '3 упражнения', category: 'strength' },
    { id: 7, type: 'йога', time: '40 мин', count: '6 упражнений', category: 'stretching' },
    { id: 8, type: 'пилатес', time: '35 мин', count: '5 упражнений', category: 'stretching' },
];

// Данные для отчетов
export const mockReportData: ReportData = {
    totalWorkouts: 12,
    totalTime: 132,
    totalExercises: 34,
    byCategory: {
        cardio: 4,
        strength: 4,
        stretching: 4
    },
    weeklyData: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        current: [2, 1, 3, 2, 4, 1, 2],
        previous: [1, 2, 2, 1, 3, 2, 1]
    },
    monthlyData: {
        labels: ['1 нед', '2 нед', '3 нед', '4 нед'],
        current: [7, 12, 8, 15],
        previous: [5, 8, 10, 6]
    }
};

// Данные для графика по месяцам
export const mockComparisonData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    current: [45, 52, 48, 70, 65, 80],
    previous: [30, 35, 40, 45, 50, 55]
};

// Запланированные тренировки
export const mockScheduledWorkouts: ScheduledWorkout[] = [
    {
        id: 1,
        date: '02.03',
        time: '56 мин',
        exercises: [
            { id: 1, name: 'бег', type: 'бег' },
            { id: 2, name: 'растяжка', type: 'растяжка' },
            { id: 3, name: 'борьба', type: 'борьба' },
        ]
    },
    {
        id: 2,
        date: '03.03',
        time: '45 мин',
        exercises: [
            { id: 4, name: 'силовая', type: 'силовая' },
            { id: 5, name: 'кардио', type: 'кардио' },
        ]
    }
];

// Слайды для онбординга
export const onboardingSlides: OnboardingSlide[] = [
    {
        id: 1,
        image: '/onboarding-1.jpg',
        alt: 'Тренировка 1'
    },
    {
        id: 2,
        image: '/onboarding-2.jpg',
        alt: 'Тренировка 2'
    },
    {
        id: 3,
        image: '/onboarding-3.jpg',
        alt: 'Тренировка 3'
    },
];

// Данные для about
export const aboutData: AboutData[] = [
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

// Сообщения для интерфейса (вместо alert)
export const messages = {
    success: {
        profileSaved: 'Изменения сохранены!',
        passwordChanged: 'Пароль успешно изменен!',
        accountDeleted: 'Аккаунт успешно удален',
        workoutAdded: 'Тренировка добавлена',
        workoutEdited: 'Тренировка отредактирована',
        workoutDeleted: 'Тренировка удалена',
        exportStarted: 'Подготовка отчета к экспорту...'
    },
    error: {
        fillAllFields: 'Заполните все поля',
        passwordLength: 'Пароль должен быть не менее 6 символов',
        passwordMatch: 'Пароли не совпадают',
        userNotFound: 'Пользователь не найден',
        wrongCredentials: 'Неверный email или пароль',
        emailRequired: 'Введите email',
        invalidEmail: 'Введите корректный email',
        agreementRequired: 'Необходимо согласие на обработку данных',
        codeNotFound: 'Код не найден. Запросите новый код.',
        invalidCode: 'Неверный код',
        codeExpired: 'Код истек. Запросите новый код.',
        oldPasswordRequired: 'Введите текущий пароль',
        wrongOldPassword: 'Неверный текущий пароль',
        confirmDelete: 'Подтвердите удаление аккаунта'
    },
    info: {
        resetCodeSent: (email: string) => `Код восстановления отправлен на ${email}`,
        checkConsole: 'Код в консоли браузера',
        exportFeature: 'Функция экспорта в PDF будет доступна в ближайшее время',
        noData: 'Нет данных для отображения'
    },
    warning: {
        deleteAccount: 'Это действие нельзя отменить. Все ваши данные будут потеряны.',
        unsavedChanges: 'У вас есть несохраненные изменения'
    }
};

// Для обратной совместимости
export const statData = mockStats;
export const workoutData = mockWorkouts;

// Функции для получения данных
export const getWorkoutsByCategory = (category: string) => {
    if (category === 'all') return mockWorkouts;
    return mockWorkouts.filter(w => w.category === category);
};

export const getTotalStats = () => {
    const totalWorkouts = mockWorkouts.length;
    const totalTime = mockWorkouts.reduce((acc, w) => acc + w.duration, 0);
    const totalExercises = mockWorkouts.reduce((acc, w) => acc + w.exercisesCount, 0);
    
    return {
        totalWorkouts,
        totalTime,
        totalExercises
    };
};

export const getStatsByCategory = (category: CategoryType) => {
    if (category === 'all') {
        return {
            workouts: mockWorkouts.length,
            time: mockWorkouts.reduce((acc, w) => acc + w.duration, 0),
            exercises: mockWorkouts.reduce((acc, w) => acc + w.exercisesCount, 0)
        };
    }
    
    const filtered = mockWorkouts.filter(w => w.category === category);
    return {
        workouts: filtered.length,
        time: filtered.reduce((acc, w) => acc + w.duration, 0),
        exercises: filtered.reduce((acc, w) => acc + w.exercisesCount, 0)
    };
};

// Экспорт всего одним объектом
export const mockData = {
    users: mockUsers,
    workouts: mockWorkouts,
    stats: mockStats,
    report: mockReportData,
    comparison: mockComparisonData,
    scheduledWorkouts: mockScheduledWorkouts,
    onboardingSlides: onboardingSlides,
    aboutData: aboutData,
    messages: messages,
    getWorkoutsByCategory,
    getTotalStats,
    getStatsByCategory,
    statData: mockStats,
    workoutData: mockWorkouts,
};