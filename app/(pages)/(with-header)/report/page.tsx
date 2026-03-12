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
  const [showMessage, setShowMessage] = useState<string | null>(null);

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
    completed: 100,
    previousTotal: 100,
    previousCompleted: 100
  });

  const reportOptions = [
    { value: 'simple', label: 'Обычный отчет' },
    { value: 'comparative', label: 'Сравнительный отчет' },
  ];

  const periodOptions = [
    { value: 'month', label: 'Месяц' },
    { value: 'twoMonths', label: 'Два месяца' },
  ];

  const categoryOptions = [
    'Все категории',
    'Кардио',
    'Силовые',
    'Растяжка',
  ];

  useEffect(() => {
    const categoryValues: CategoryType[] = [];

    if (selectedCategories.includes('Все категории') || selectedCategories.length === 0) {
      categoryValues.push('all');
    } else {
      if (selectedCategories.includes('Кардио')) categoryValues.push('cardio');
      if (selectedCategories.includes('Силовые')) categoryValues.push('strength');
      if (selectedCategories.includes('Растяжка')) categoryValues.push('stretching');
    }

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

    const totalWorkoutsCount = mockData.workouts.length;
    const selectedCount = selectedCategories.includes('Все категории') || selectedCategories.length === 0
      ? totalWorkoutsCount
      : mockData.workouts.filter(w => {
        if (selectedCategories.includes('Кардио') && w.category === 'cardio') return true;
        if (selectedCategories.includes('Силовые') && w.category === 'strength') return true;
        if (selectedCategories.includes('Растяжка') && w.category === 'stretching') return true;
        return false;
      }).length;

    setDonutData({
      total: 100,
      completed: Math.round((selectedCount / totalWorkoutsCount) * 100),
      previousTotal: 100,
      previousCompleted: Math.round(((selectedCount - 2) / totalWorkoutsCount) * 100)
    });

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
    }
  }, [reportType, period, selectedCategories]);

  return (
    <div className="min-h-screen bg-main">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-9">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
          
          {showMessage && (
            <div className="p-3 bg-blue-100 border border-blue-500 rounded-2xl text-blue-700 text-sm text-center">
              {showMessage}
            </div>
          )}
          
          <div className="lg:flex lg:items-center lg:gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:flex-1">
              <div className="min-w-0">
                <Filter
                  options={reportOptions.map(opt => opt.label)}
                  onSelect={(value) => {
                    const option = reportOptions.find(opt => opt.label === value);
                    if (option) setReportType(option.value as ReportType);
                  }}
                  buttonText="Вид отчета"
                />
              </div>

              <div className="min-w-0">
                <Filter
                  options={periodOptions.map(opt => opt.label)}
                  onSelect={(value) => {
                    const option = periodOptions.find(opt => opt.label === value);
                    if (option) setPeriod(option.value as PeriodType);
                  }}
                  buttonText="Период"
                />
              </div>

              <div className="min-w-0">
                <MultiSelectFilter
                  options={categoryOptions}
                  onSelect={setSelectedCategories}
                  buttonText="Категория"
                  maxDisplay={1}
                />
              </div>
            </div>

            <div className="flex justify-center mt-4 lg:mt-0 lg:flex-shrink-0">
              <ExportButton 
                reportData={chartData}
                stats={stats}
                reportType={reportType}
              />
            </div>
          </div>

          <StatsCards
            workouts={stats.workouts}
            totalTime={stats.totalTime}
            exercises={stats.exercises}
          />

          <div className="lg:flex lg:gap-6 lg:items-center">
            <div className="rounded-2xl lg:flex-[2]">
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
                />
              )}
            </div>

            <div className="rounded-2xl p-4 sm:p-6 lg:flex-1">
              <div className="flex justify-center">
                {reportType === 'simple' ? (
                  <SingleDonut
                    total={donutData.total}
                    completed={donutData.completed}
                    size={280}
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
        </div>
      </div>
    </div>
  );
}