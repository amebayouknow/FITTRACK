import { useEffect, useState } from "react";
import { IProfileProps } from "../../page";
import InputField from "@/app/_Components/Input/input";
import Button from "@/app/_Components/Button/button";
import { useRouter } from "next/navigation";

export default function Form({
  profile,
  isEditing,
}: {
  profile: IProfileProps;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter();

  const [form, setForm] = useState<IProfileProps>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const handleSaveChanges = async(event: React.FormEvent) => {
      event.preventDefault();

      try{
        await fetch("/api/user", {
          method: "POST",
          headers: {
            "application": "",
          },
          body: JSON.stringify(form)
        })
      } catch (error){
        console.log(error)
      } finally {
        router.push("/home");
      }
    };

  const handleCancelEdit = () => {
    router.push("/home");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSaveChanges} className="w-full max-w-md lg:max-w-lg space-y-4">
        {/* Цель на неделю */}
        <div>
          <InputField
            type="number"
            hint="Цель на неделю"
            value={form.goal != null ? form.goal : ""}
            onChange={handleChange}
            name="goal"
            disabled={!isEditing}
            autoComplete="off"
          />
        </div>
        {/* Пол */}
        <div>
          <InputField
            type="text"
            hint="Пол"
            name="sex"
            value={form.sex != null ? form.sex : ""}
            onChange={handleChange}
            disabled={!isEditing}
            autoComplete="off"
          />
        </div>

        {/* Возраст */}
        <div>
          <InputField
            type="number"
            hint="Возраст"
            name="age"
            value={form.age != null ? form.age : ""}
            onChange={handleChange}
            disabled={!isEditing}
            autoComplete="off"
          />
        </div>

        {/* Рост */}
        <div>
          <InputField
            type="number"
            hint="Рост (см)"
            name="height"
            value={form.height != null ? form.height : ""}
            onChange={handleChange}
            disabled={!isEditing}
            autoComplete="off"
          />
        </div>

        {/* Вес */}
        <div>
          <InputField
            type="number"
            hint="Вес (кг)"
            name="weight"
            value={form.weight != null ? form.weight : ""}
            onChange={handleChange}
            disabled={!isEditing}
            autoComplete="off"
          />
        </div>

        {/* Кнопки редактирования */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="flex-1 min-w-0">
              <Button
                text="Отмена"
                variant="outline"
                onClick={handleCancelEdit}
              />
            </div>
            <div className="flex-1 min-w-0">
              <Button
                text="Сохранить"
                variant="primary"
                type="submit"
                // onClick={handleSaveChanges}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
