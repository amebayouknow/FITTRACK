import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import Logo from "@/app/_Components/Logo/logo";
import { Dispatch, SetStateAction, useState } from "react";

export default function Reset({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<"login" | "request" | "reset">>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone shadow-lg sm:shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">
          {/* Логотип */}
          <div className="flex justify-center mb-6 md:mb-8">
            <Logo disableLink={true} />
          </div>
          {/* Сообщения */}
          <div className="mb-4 p-3 bg-green-100 border border-green-500 rounded-2xl text-green-700 text-sm text-center">
            asd
          </div>
          {/* Заголовок */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">
              Новый пароль
            </h1>
            <p className="text-sm text-secondary">
              Введите код из письма и новый пароль
            </p>
          </div>

          {/* Форма */}
          <div className="flex justify-center">
            <div className="w-full max-w-md lg:max-w-lg">
              <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-2xl text-warning text-sm text-center">
                asd
              </div>

              <div className="space-y-4">
                <InputField
                  type="text"
                  hint="Код из письма"
                  //   value={resetCode}
                  //   onChange={setResetCode}
                  autoComplete="one-time-code"
                />

                <InputField
                  type="password"
                  hint="Новый пароль"
                  //   value={newPassword}
                  //   onChange={setNewPassword}
                  autoComplete="new-password"
                />

                <InputField
                  type="password"
                  hint="Подтвердите пароль"
                  //   value={confirmPassword}
                  //   onChange={setConfirmPassword}
                  autoComplete="new-password"
                />

                <Button
                  text={isLoading ? "Сохранение..." : "Сохранить новый пароль"}
                  variant="primary"
                />

                <div className="flex justify-center">
                  <Button
                    text="Назад"
                    variant="text"
                    onClick={() => setStep("request")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
