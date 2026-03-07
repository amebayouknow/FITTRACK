"use client";

import { useState, useEffect } from 'react';
import Filter from "@/app/_Components/Filter/filter";
import MultiSelectFilter from "@/app/_Components/Filter/Multifilter";
import StatsCards from './_components/StatsCards/StatsCards';
import LineChart from './_components/Chart/LineChart';
import ComparisonChart from './_components/Chart/ComparisonChart';
import SingleDonut from './_components/DonutChart/SingleDonut';
import DoubleDonut from './_components/DonutChart/DoubleDonut';
import ExportButton from './_components/ExportButton/ExportButton';
import { mockData, getStatsByCategory } from '@/app/MocData';
import { ReportType, PeriodType, CategoryType } from '@/app/index';

// Расширяем тип для данных графика
interface ChartDataType {
  labels: string[];
  current: number[];
  previous?: number[];
  periodLabel?: string;
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('simple');
  const [period, setPeriod] = useState<PeriodType>('month');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Для отображения выбранных значений
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  // Состояния для данных
  const [stats, setStats] = useState({
    workouts: mockData.report.totalWorkouts,
    totalTime: mockData.report.totalTime,
    exercises: mockData.report.totalExercises
  });

  const [chartData, setChartData] = useState<ChartDataType>({
    labels: mockData.report.monthlyData.labels,
    current: mockData.report.monthlyData.current,
    previous: mockData.report.monthlyData.previous,
    periodLabel: ''
  });

  const [donutData, setDonutData] = useState({
    total: 100,
    completed: 65,
    previousTotal: 100,
    previousCompleted: 45
  });

  // Опции для фильтров
  const reportOptions = [
    { value: 'simple', label: 'Обычный отчет' },
    { value: 'comparative', label: 'Сравнительный отчет' },
  ];

  const periodOptions = [
    { value: 'month', label: 'Месяц' },
    { value: 'twoMonths', label: 'Два месяца' },
    { value: 'quarter', label: 'Квартал' },
  ];

  const categoryOptions = [
    'Все категории',
    'Кардио',
    'Силовые',
    'Растяжка',
  ];

  // Обновление данных при изменении фильтров
  useEffect(() => {
    // Преобразуем выбранные категории в значения для фильтрации
    const categoryValues: CategoryType[] = [];

    // Логика: если выбрано "Все категории", игнорируем остальные
    if (selectedCategories.includes('Все категории')) {
      categoryValues.push('all');
    } else {
      if (selectedCategories.includes('Кардио')) categoryValues.push('cardio');
      if (selectedCategories.includes('Силовые')) categoryValues.push('strength');
      if (selectedCategories.includes('Растяжка')) categoryValues.push('stretching');

      // Если ничего не выбрано, показываем все
      if (categoryValues.length === 0) {
        categoryValues.push('all');
      }
    }

    // Получаем статистику по выбранным категориям
    let totalWorkouts = 0;
    let totalTime = 0;
    let totalExercises = 0;

    if (categoryValues.includes('all')) {
      const allStats = getStatsByCategory('all');
      totalWorkouts = allStats.workouts;
      totalTime = allStats.time;
      totalExercises = allStats.exercises;
    } else {
      categoryValues.forEach(cat => {
        const catStats = getStatsByCategory(cat);
        totalWorkouts += catStats.workouts;
        totalTime += catStats.time;
        totalExercises += catStats.exercises;
      });
    }

    setStats({
      workouts: totalWorkouts,
      totalTime,
      exercises: totalExercises
    });

    // Данные для графика в зависимости от периода
    if (period === 'month') {
      setChartData({
        labels: ['1 нед', '2 нед', '3 нед', '4 нед'],
        current: [7, 12, 8, 15],
        previous: [5, 8, 10, 6],
        periodLabel: 'Январь - Март 2024'
      });
    } else if (period === 'twoMonths') {
      setChartData({
        labels: ['1 нед', '2 нед', '3 нед', '4 нед', '5 нед', '6 нед', '7 нед', '8 нед'],
        current: [7, 12, 8, 15, 10, 14, 9, 11],
        previous: [5, 8, 10, 6, 7, 9, 8, 10],
        periodLabel: 'Февраль - Март 2024'
      });
    } else {
      setChartData({
        labels: ['1 нед', '2 нед', '3 нед', '4 нед', '5 нед', '6 нед', '7 нед', '8 нед', '9 нед', '10 нед', '11 нед', '12 нед'],
        current: [7, 12, 8, 15, 10, 14, 9, 11, 13, 16, 12, 18],
        previous: [5, 8, 10, 6, 7, 9, 8, 10, 11, 12, 9, 13],
        periodLabel: 'Январь - Март 2024'
      });
    }
  }, [reportType, period, selectedCategories]);

  // Обработчики для фильтров
  const handleReportTypeChange = (value: string) => {
    setSelectedReport(value);
    const option = reportOptions.find(opt => opt.label === value);
    if (option) {
      setReportType(option.value as ReportType);
    }
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    const option = periodOptions.find(opt => opt.label === value);
    if (option) {
      setPeriod(option.value as PeriodType);
    }
  };

  const handleCategoryChange = (selected: string[]) => {
    // Логика: если выбран "Все категории", то остальные не могут быть выбраны
    if (selected.includes('Все категории')) {
      // Если выбрали "Все категории", устанавливаем только его
      setSelectedCategories(['Все категории']);
    } else {
      // Если "Все категории" не выбран, устанавливаем все выбранные категории
      setSelectedCategories(selected);
    }
  };

  return (
    <div className="min-h-screen bg-[#E7E5E4]">
      <div className="flex flex-col gap-9 px-2 py-9 max-w-[320px] mx-auto">


        {/* Фильтры */}
        <div className="flex flex-col gap-4">
          <Filter
            options={reportOptions.map(opt => opt.label)}
            onSelect={handleReportTypeChange}
            buttonText="Вид отчета"
          />

          <Filter
            options={periodOptions.map(opt => opt.label)}
            onSelect={handlePeriodChange}
            buttonText="Период"
          />

          <MultiSelectFilter
            options={categoryOptions}
            onSelect={handleCategoryChange}
            buttonText="Категории упражнений"
            maxDisplay={2}
          />
        </div>

        {/* Информация о выбранных фильтрах */}
        <div className="bg-white/50 p-3 rounded-xl text-xs text-secondary space-y-1">
          <p>Вид отчета: <span className="text-primary font-medium ml-1">{selectedReport || 'не выбран'}</span></p>
          <p>Период: <span className="text-primary font-medium ml-1">{selectedPeriod || 'не выбран'}</span></p>
          <p>Категории: <span className="text-primary font-medium ml-1">
            {selectedCategories.length > 0
              ? (selectedCategories.includes('Все категории')
                ? 'Все категории'
                : selectedCategories.join(', '))
              : 'не выбраны'}
          </span></p>
        </div>

        {/* Кнопка экспорта */}
        <ExportButton />

        {/* Статистика */}
        <StatsCards
          workouts={stats.workouts}
          totalTime={stats.totalTime}
          exercises={stats.exercises}
        />

        {/* График */}
        <div>
          {reportType === 'simple' ? (
            <LineChart
              labels={chartData.labels}
              data={chartData.current}
            />
          ) : (
            <ComparisonChart
              labels={chartData.labels}
              currentData={chartData.current}
              previousData={chartData.previous || []}
              currentLabel="Текущий"
              previousLabel="Прошлый"
            />
          )}
        </div>

        {/* Кольцевая диаграмма */}
        <div>
          {reportType === 'simple' ? (
            <SingleDonut
              total={donutData.total}
              completed={donutData.completed}
              size={180}
            />
          ) : (
            <DoubleDonut
              currentTotal={donutData.total}
              currentCompleted={donutData.completed}
              previousTotal={donutData.total}
              previousCompleted={donutData.previousCompleted}
              currentLabel="Текущий период"
              previousLabel="Прошлый период"
              size={180}
            />
          )}
        </div>
      </div>
    </div>
  );
}