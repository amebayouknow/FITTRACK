"use client";

import { useState, useEffect } from "react";
import Button from "./_Components/Button/button";
import Header from "./_Components/Header/header";
import TableRow from "./_Components/Workout/TableRow/tablerow";
import AddWorkout from "./_Components/Workout/add/add";
import Filter from './_Components/Filter/filter';
import InputField from "./_Components/Input/input";
import { workoutData as mockWorkoutData, statData as mockStatData } from './MocData';
import type { WorkoutData, StatData } from './index';

export default function Home() {
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
  const [statData, setStatData] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // API запрос
        setWorkoutData(mockWorkoutData);
        setStatData(mockStatData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      
      <main className="space-y-4">

          {workoutData.map((item, index) => (
            <TableRow
              key={`workout-${item.id || index}`}
              type="workout"
              data={item}
            />
          ))}

          {statData.map((item, index) => (
            <TableRow
              key={`stat-${item.id || index}`}
              type="stat"
              data={item}
            />
          ))}

          {workoutData.map((item, index) => (
            <TableRow
              key={`alt-${item.id || index}`}
              type="workout-alt"
              data={item}
            />
          ))}

        <AddWorkout />

        <div className="flex flex-wrap gap-4 items-center">
          <Filter
            options={['бебебе', 'бубубу', 'бябябя', 'бобобо']}
            buttonText="Сортировка"
          />
          
          <Button text='Смотреть отчет' variant='primary' />
          <Button text='Смотреть отчет' variant='secondary' />
          <Button text='Смотреть отчет' variant='outline' />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField hint="Имя пользователя" />
          <InputField hint="Электронная почта" />
          <InputField hint="Пароль" type="password" />
          <InputField hint="Возраст" type="number" />
        </div>
      </main>
    </div>
  );
}