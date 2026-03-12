"use client";

import ReportPDF from "@/app/_Components/Export/ExportReport/ExportReport";

interface ExportButtonProps {
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

export default function ExportButton({ 
  reportData, 
  stats, 
  reportType 
}: ExportButtonProps) {
  return (
    <ReportPDF
      reportData={reportData}
      stats={stats}
      reportType={reportType}
    />
  );
}