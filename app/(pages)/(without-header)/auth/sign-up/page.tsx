"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import Logo from "@/app/_Components/Logo/logo";
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import { validateForm } from "./utils";
import { IServerResponse } from "@/app/api/types";

export interface IForm {
  email: string;
  password: string;
  confirmPassword: string;
  isAgreed: boolean;
}

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState<IForm>({
    email: "",
    password: "",
    confirmPassword: "",
    isAgreed: false,
  });
  const [showMessage, setShowMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCheckboxChange = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      isAgreed: checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const valid = validateForm(form);

    if (valid.isValid) {
      try {
        const res = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const data: IServerResponse = await res.json();
        if (data.success) {
          router.push("/auth/sign-in");
          console.log("Успех");
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      setShowMessage(valid.errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-stone md:[box-shadow:0_0_20px_10px_rgba(249,115,22,0.25)] lg:rounded-3xl p-5 sm:p-6 md:p-8"
        >
          <div className="flex justify-start mb-6 md:mb-8">
            <Logo disableLink={true} />
          </div>

          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">
              Создание нового аккаунта
            </h1>
            <p className="text-sm text-secondary">
              Давайте начнем наше знакомство.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md lg:max-w-lg space-y-4">
              <InputField
                type="email"
                hint="Email"
                value={form.email}
                name="email"
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <InputField
                type="password"
                hint="Пароль"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <InputField
                type="password"
                hint="Повторите пароль"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <div className="pt-2">
                <Checkbox
                  label="Я согласен на обработку персональных данных"
                  checked={form.isAgreed}
                  onChange={handleCheckboxChange}
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
                text={isLoading ? "Подождите..." : "Зарегистрироваться"}
                variant="primary"
                type="submit"
                disabled={isLoading}
              />

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-secondary/20"></div>
                <span className="flex-shrink mx-4 text-sm text-secondary">
                  или
                </span>
                <div className="flex-grow border-t border-secondary/20"></div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-base text-secondary">Уже есть аккаунт?</p>
                <Button text="Войти" variant="text" href="/auth/sign-in" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
