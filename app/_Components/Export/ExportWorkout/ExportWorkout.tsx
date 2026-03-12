"use client";

import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import Button from '../../Button/button';
import { ScheduledWorkout } from '@/app/index';

interface ExportWorkoutProps {
    workouts: ScheduledWorkout[];
    selectedDate?: string;
}

export default function ExportWorkout({ workouts, selectedDate }: ExportWorkoutProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        if (workouts.length === 0) {
            alert('Нет данных для экспорта');
            return;
        }

        setIsGenerating(true);

        try {
            // Создаем элемент для PDF
            const element = document.createElement('div');
            element.style.padding = '30px';
            element.style.backgroundColor = 'white';
            element.style.fontFamily = 'Arial, sans-serif';
            element.style.maxWidth = '800px';
            element.style.margin = '0 auto';
            
            // Вычисляем статистику
            const totalWorkouts = workouts.length;
            const completedWorkouts = workouts.filter(w => w.completed).length;
            const completionRate = totalWorkouts ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;

            // Формируем HTML
            element.innerHTML = `
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #f97316; font-size: 28px; margin: 0 0 10px 0;">🏋️ FitTrack</h1>
                    <p style="color: #666; font-size: 14px; margin: 0;">
                        ${selectedDate 
                            ? `Тренировки за ${selectedDate}` 
                            : `Отчет создан: ${new Date().toLocaleDateString('ru-RU')}`
                        }
                    </p>
                </div>

                <!-- Статистика -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="color: #666; font-size: 12px; margin-bottom: 5px;">Всего тренировок</div>
                        <div style="font-size: 32px; font-weight: bold; color: #f97316;">${totalWorkouts}</div>
                    </div>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="color: #666; font-size: 12px; margin-bottom: 5px;">Выполнено</div>
                        <div style="font-size: 32px; font-weight: bold; color: #22c55e;">${completedWorkouts}</div>
                    </div>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="color: #666; font-size: 12px; margin-bottom: 5px;">Процент</div>
                        <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">${completionRate}%</div>
                    </div>
                </div>

                <!-- Список тренировок -->
                <h2 style="color: #f97316; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #f97316; padding-bottom: 8px;">
                    Список тренировок
                </h2>

                ${workouts.map((workout, index) => `
                    <div style="margin-bottom: 20px; padding: 15px; background-color: ${workout.completed ? '#f0fdf4' : '#fff7ed'}; border-radius: 8px; border-left: 4px solid ${workout.completed ? '#22c55e' : '#f97316'};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <h3 style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">
                                Тренировка ${workout.date}
                            </h3>
                            <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; background-color: ${workout.completed ? '#22c55e20' : '#f9731620'}; color: ${workout.completed ? '#22c55e' : '#f97316'};">
                                ${workout.completed ? '✓ Выполнено' : '○ Запланировано'}
                            </span>
                        </div>
                        <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Время: ${workout.time}</p>
                        
                        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                            <thead>
                                <tr style="background-color: #e5e5e5;">
                                    <th style="padding: 6px; text-align: left; border: 1px solid #ddd;">Упражнение</th>
                                    <th style="padding: 6px; text-align: left; border: 1px solid #ddd;">Тип</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${workout.exercises.map(ex => `
                                    <tr>
                                        <td style="padding: 6px; border: 1px solid #ddd;">${ex.name}</td>
                                        <td style="padding: 6px; border: 1px solid #ddd;">${ex.type}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `).join('')}

                <!-- Подвал -->
                <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 10px;">
                    FitTrack - Отчет создан автоматически
                </div>
            `;

            // Добавляем в DOM
            document.body.appendChild(element);

            // Ждем рендеринга
            await new Promise(resolve => setTimeout(resolve, 500));

            // @ts-ignore - игнорируем ошибки типов
            const opt = {
                margin: 0.5,
                filename: selectedDate ? `тренировки-${selectedDate}.pdf` : 'все-тренировки.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // @ts-ignore
            await html2pdf().set(opt).from(element).save();

            // Удаляем элемент
            document.body.removeChild(element);

        } catch (error) {
            console.error('PDF Error:', error);
            alert('Ошибка при создании PDF');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            text={isGenerating ? "Генерация..." : "Экспорт PDF"}
            variant="outline"
            onClick={generatePDF}
            disabled={isGenerating}
            className="text-sm"
        />
    );
}