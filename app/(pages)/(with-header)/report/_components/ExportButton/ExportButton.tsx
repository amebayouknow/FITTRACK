"use client";

import Button from "@/app/_Components/Button/button";
import { messages } from '@/app/MocData';

interface ExportButtonProps {
  setShowMessage?: (message: string | null) => void;
}

export default function ExportButton({ setShowMessage }: ExportButtonProps) {
  const handleExport = () => {
    if (setShowMessage) {
      setShowMessage(messages.info.exportFeature);
      setTimeout(() => setShowMessage(null), 3000);
    }
    console.log('Экспорт отчета в PDF');
  };

  return (
    <Button
      text="Экспортировать отметки"
      variant="primary"
      onClick={handleExport}
    />
  );
}