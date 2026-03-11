"use client";

import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import Button from '../../Button/button';

interface ReportPDFProps {
    reportData: {
        labels: string[];
        current: number[];
        previous?: number[];
        periodLabel?: string;
    };
    stats: {
        workouts: number;
        totalTime: number;
        exercises: number;
    };
    reportType: 'simple' | 'comparative';
}

export default function ReportPDF({ reportData, stats, reportType }: ReportPDFProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);

        try {
            const element = document.createElement('div');
            element.style.padding = '40px';
            element.style.backgroundColor = 'white';
            element.style.fontFamily = 'Arial, sans-serif';
            element.style.maxWidth = '900px';
            element.style.margin = '0 auto';

            const averageWorkouts = reportData.current.length 
                ? Math.round(reportData.current.reduce((a, b) => a + b, 0) / reportData.current.length) 
                : 0;
            
            const maxWorkouts = Math.max(...reportData.current);
            const maxIndex = reportData.current.indexOf(maxWorkouts);
            const bestPeriod = reportData.labels[maxIndex];

            element.innerHTML = `
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #f97316; font-size: 32px; margin: 0 0 10px 0;">📊 FitTrack - Отчет</h1>
                    <p style="color: #666; font-size: 14px; margin: 5px 0;">
                        ${reportType === 'simple' ? 'Обычный отчет' : 'Сравнительный отчет'}
                    </p>
                    <p style="color: #999; font-size: 12px; margin: 5px 0;">
                        Период: ${reportData.periodLabel || 'Выбранный период'}
                    </p>
                    <p style="color: #999; font-size: 12px; margin: 5px 0;">
                        Создано: ${new Date().toLocaleDateString('ru-RU')}
                    </p>
                </div>

                <!-- Ключевые показатели -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                    <div style="background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Всего тренировок</div>
                        <div style="font-size: 42px; font-weight: bold; line-height: 1;">${stats.workouts}</div>
                        <div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">за период</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Общее время</div>
                        <div style="font-size: 42px; font-weight: bold; line-height: 1;">${stats.totalTime}</div>
                        <div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">минут</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Упражнений</div>
                        <div style="font-size: 42px; font-weight: bold; line-height: 1;">${stats.exercises}</div>
                        <div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">выполнено</div>
                    </div>
                </div>

                <!-- Дополнительная статистика -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h3 style="color: #f97316; font-size: 16px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #f97316;">
                            Средние показатели
                        </h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #64748b;">В среднем тренировок:</span>
                            <span style="font-weight: bold; color: #f97316;">${averageWorkouts}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #64748b;">Среднее время:</span>
                            <span style="font-weight: bold; color: #22c55e;">${Math.round(stats.totalTime / (stats.workouts || 1))} мин</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #64748b;">Упражнений за тренировку:</span>
                            <span style="font-weight: bold; color: #3b82f6;">${Math.round(stats.exercises / (stats.workouts || 1))}</span>
                        </div>
                    </div>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h3 style="color: #f97316; font-size: 16px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #f97316;">
                            Лучший результат
                        </h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #64748b;">Максимум:</span>
                            <span style="font-weight: bold; color: #f97316;">${maxWorkouts}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #64748b;">Период:</span>
                            <span style="font-weight: bold; color: #22c55e;">${bestPeriod}</span>
                        </div>
                    </div>
                </div>

                <!-- Динамика тренировок -->
                <div style="margin-bottom: 40px;">
                    <h3 style="color: #f97316; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #f97316;">
                        Динамика тренировок
                    </h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <thead>
                            <tr style="background-color: #f97316; color: white;">
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Период</th>
                                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Текущий период</th>
                                ${reportType === 'comparative' ? 
                                    '<th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Прошлый период</th>' + 
                                    '<th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Динамика</th>' 
                                : ''}
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.labels.map((label, i) => {
                                const current = reportData.current[i];
                                const previous = reportData.previous?.[i] || 0;
                                const change = reportType === 'comparative' ? current - previous : 0;
                                const changeColor = change > 0 ? '#22c55e' : change < 0 ? '#ef4444' : '#64748b';
                                const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '→';
                                
                                return `
                                    <tr style="background-color: ${i % 2 === 0 ? '#ffffff' : '#f8fafc'};">
                                        <td style="padding: 10px; border: 1px solid #ddd;">${label}</td>
                                        <td style="padding: 10px; text-align: center; border: 1px solid #ddd; font-weight: bold; color: #f97316;">${current}</td>
                                        ${reportType === 'comparative' ? `
                                            <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${previous}</td>
                                            <td style="padding: 10px; text-align: center; border: 1px solid #ddd; color: ${changeColor}; font-weight: bold;">
                                                ${changeSymbol} ${Math.abs(change)}
                                            </td>
                                        ` : ''}
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                        ${reportType === 'comparative' ? `
                            <tfoot>
                                <tr style="background-color: #f1f5f9; font-weight: bold;">
                                    <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">Итого:</td>
                                    <td style="padding: 12px; text-align: center; border: 1px solid #ddd; color: #f97316;">
                                        ${reportData.current.reduce((a, b) => a + b, 0)}
                                    </td>
                                    <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">
                                        ${reportData.previous?.reduce((a, b) => a + b, 0) || 0}
                                    </td>
                                    <td style="padding: 12px; text-align: center; border: 1px solid #ddd; color: ${(reportData.current.reduce((a, b) => a + b, 0) - (reportData.previous?.reduce((a, b) => a + b, 0) || 0)) > 0 ? '#22c55e' : '#ef4444'};">
                                        ${(reportData.current.reduce((a, b) => a + b, 0) - (reportData.previous?.reduce((a, b) => a + b, 0) || 0)) > 0 ? '+' : ''}
                                        ${reportData.current.reduce((a, b) => a + b, 0) - (reportData.previous?.reduce((a, b) => a + b, 0) || 0)}
                                    </td>
                                </tr>
                            </tfoot>
                        ` : ''}
                    </table>
                </div>

                <!-- Подвал -->
                <div style="margin-top: 40px; text-align: center; color: #999; font-size: 10px; border-top: 1px solid #eee; padding-top: 20px;">
                    FitTrack - Отчет создан автоматически
                </div>
            `;

            document.body.appendChild(element);
            await new Promise(resolve => setTimeout(resolve, 500));

            // @ts-ignore
            const opt = {
                margin: 0.5,
                filename: `отчет-${Date.now()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // @ts-ignore
            await html2pdf().set(opt).from(element).save();

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
            text={isGenerating ? "Генерация..." : "Экспорт отчета"}
            variant="primary"
            onClick={generatePDF}
            disabled={isGenerating}
            className="text-sm"
        />
    );
}