import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import Logo from "@/app/_Components/Logo/logo";
import { IServerResponse } from "@/app/api/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export default function Form({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<"login" | "request" | "reset">>;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const ServerResponse = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data: IServerResponse<string> = await ServerResponse.json();
      if (data.success && data.body) {
        router.push("/home")
      } else {
        setShowMessage(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone md:[box-shadow:0_0_20px_10px_rgba(249,115,22,0.25)] lg:rounded-3xl p-5 sm:p-6 md:p-8">
          {/* Логотип */}
          <div className="flex justify-start mb-6 md:mb-8">
            <Logo disableLink={true} />
          </div>

          {/* Заголовок */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">
              С возвращением!
            </h1>
            <p className="text-sm text-secondary">
              Введите свои данные для входа
            </p>
          </div>

          {/* Форма */}
          <div className="flex justify-center">
            <div className="w-full max-w-md lg:max-w-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <InputField
                    type="email"
                    hint="Email"
                    value={form.email}
                    name="email"
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <InputField
                    type="password"
                    hint="Пароль"
                    value={form.password}
                    name="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </div>
                {showMessage && (
                  <div
                    style={{ background: "red", color: "white" }}
                    className="mb-4 p-3 border border-rose-500 rounded-2xl text-sm text-center"
                  >
                    {showMessage}
                  </div>
                )}

                <Button
                  text={isLoading ? "Вход..." : "Войти"}
                  variant="primary"
                  type="submit"
                />
              </form>

              {/* Кнопка забыли пароль */}
              <div className="flex justify-center mt-4">
                <Button
                  text="Забыли пароль?"
                  variant="text"
                  onClick={() => setStep("request")}
                />
              </div>

              {/* Разделитель */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-secondary/20"></div>
                <span className="flex-shrink mx-4 text-sm text-secondary">
                  или
                </span>
                <div className="flex-grow border-t border-secondary/20"></div>
              </div>

              {/* Регистрация */}
              <div className="text-center space-y-2">
                <p className="text-base text-secondary">Ещё нет аккаунта?</p>
                <Button
                  text="Зарегистрироваться"
                  variant="text"
                  href="/auth/sign-up"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
