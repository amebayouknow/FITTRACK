"use client";

import Button from "@/app/_Components/Button/button";

export default function ExportButton() {
  const handleExport = () => {
    // В реальном приложении здесь будет генерация PDF
    console.log('Экспорт отчета в PDF');
    alert('Функция экспорта в PDF будет доступна в ближайшее время');
  };

  return (
    <Button
      text="Экспортировать отметки"
      variant="primary"
      onClick={handleExport}
    />
  );
}