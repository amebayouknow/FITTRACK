"use client";

import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import Button from '../Button/button';

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
    const contentRef = useRef<HTMLDivElement>(null);

    const generatePDF = async () => {
        if (!contentRef.current) return;

        setIsGenerating(true);

        try {
            const element = contentRef.current;
            
            // Показываем элемент
            element.style.position = 'fixed';
            element.style.top = '50%';
            element.style.left = '50%';
            element.style.transform = 'translate(-50%, -50%)';
            element.style.zIndex = '9999';
            element.style.backgroundColor = 'white';
            element.style.padding = '20px';
            element.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
            element.style.borderRadius = '10px';
            element.style.width = '800px';
            element.style.maxHeight = '90vh';
            element.style.overflow = 'auto';
            
            // Ждем рендеринга
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Опции с правильными типами
            const opt = {
                margin: 0.5,  // просто число вместо массива
                filename: `отчет-${Date.now()}.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2, letterRendering: true },
                jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
            };
            
            await html2pdf().set(opt).from(element).save();
            
        } catch (error) {
            console.error('PDF Error:', error);
            alert('Ошибка при создании PDF');
        } finally {
            // Прячем элемент
            if (contentRef.current) {
                contentRef.current.style.position = 'absolute';
                contentRef.current.style.left = '-9999px';
                contentRef.current.style.top = '0';
                contentRef.current.style.transform = 'none';
                contentRef.current.style.zIndex = '-1';
            }
            setIsGenerating(false);
        }
    };

    return (
        <>
            <div ref={contentRef} style={{ 
                position: 'absolute',
                left: '-9999px',
                top: 0,
                width: '800px',
                backgroundColor: 'white',
                fontFamily: 'Arial, sans-serif',
                padding: '30px'
            }}>
                <h1 style={{ color: '#f97316', textAlign: 'center', fontSize: '28px' }}>FitTrack - Отчет</h1>
                <p style={{ textAlign: 'center', color: '#666' }}>
                    Тип: {reportType === 'simple' ? 'Обычный' : 'Сравнительный'} | 
                    Период: {reportData.periodLabel || 'Выбранный'}
                </p>
                
                <h2 style={{ color: '#f97316', marginTop: '30px' }}>Статистика</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', margin: '20px 0' }}>
                    <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
                        <p style={{ color: '#666' }}>Тренировки</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316' }}>{stats.workouts}</p>
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
                        <p style={{ color: '#666' }}>Время</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>{stats.totalTime} мин</p>
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
                        <p style={{ color: '#666' }}>Упражнения</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.exercises}</p>
                    </div>
                </div>
                
                <h2 style={{ color: '#f97316', marginTop: '30px' }}>Детали</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f97316', color: 'white' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Период</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Текущий</th>
                            {reportType === 'comparative' && (
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Прошлый</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.labels.map((label, i) => (
                            <tr key={i}>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{label}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{reportData.current[i]}</td>
                                {reportType === 'comparative' && (
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{reportData.previous?.[i]}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Button
                text={isGenerating ? "Генерация..." : "Экспорт PDF"}
                variant="primary"
                onClick={generatePDF}
                disabled={isGenerating}
                className="text-sm"
            />
        </>
    );
}