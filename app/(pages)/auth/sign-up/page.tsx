"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import Logo from "@/app/_Components/Logo/logo";
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";

export default function SignUpPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreement: ''
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      agreement: ''
    };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Введите email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    if (!isAgreed) {
      newErrors.agreement = 'Необходимо согласие на обработку данных';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Сохраняем данные пользователя (в реальном приложении здесь будет API запрос)
      const userData = {
        email,
        name: email.split('@')[0],
        joinedDate: new Date().toLocaleDateString(),
        stats: {
          workouts: 0,
          totalTime: '0 мин',
          achievements: 0
        }
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      router.push('/home?registered=true');
    }
  };

  return (
    <div className="wrapper min-h-screen flex flex-col py-9 px-4 gap-4 bg-stone">
      <Logo />
      
      <div>
        <h1 className="text-2xl text-center text-accent mt-4 mb-4">Создание нового аккаунта</h1>
        <p className="text-sm text-primary">Давайте начнем наше знакомство.</p>
      </div>

      <InputField
        type="email"
        hint="Email"
        value={email}
        onChange={setEmail}
      />
      {errors.email && (
        <p className="text-xs text-warning mt-2">{errors.email}</p>
      )}

      <InputField
        type="password"
        hint="Пароль"
        value={password}
        onChange={setPassword}
      />
      {errors.password && (
        <p className="text-xs text-red-500 -mt-2">{errors.password}</p>
      )}

      <InputField
        type="password"
        hint="Повторите пароль"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <p className="text-xs text-red-500 -mt-2">{errors.confirmPassword}</p>
      )}

      <Checkbox
        label="Я согласен на обработку персональных данных"
        checked={isAgreed}
        onChange={setIsAgreed}
      />
      {errors.agreement && (
        <p className="text-xs text-red-500 -mt-2">{errors.agreement}</p>
      )}

        <Button
          text="Зарегистрироваться"
          variant="primary"
          onClick={handleSubmit}
        />

        <span className="flex items-center justify-center gap-1 text-base text-secondary">Уже есть аккаунт?</span>
        <Button
          text="Войти"
          variant="text"
          href="/auth/sign-in"
        />
    </div>
  );
}