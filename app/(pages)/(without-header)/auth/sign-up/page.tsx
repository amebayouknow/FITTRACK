"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import Logo from "@/app/_Components/Logo/logo";
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import { messages } from '@/app/MocData';

export default function SignUpPage() {
  const [isMounted, setIsMounted] = useState(false);
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
  const [showMessage, setShowMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
        <div className="w-full max-w-7xl mx-auto lg:px-8">
          <div className="bg-white md:bg-stone sm:shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">
            <div className="flex justify-center">
              <Logo disableLink={true} />
            </div>
            <div className="flex justify-center mt-4">
              <div className="text-secondary">Загрузка...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      agreement: ''
    };
    let isValid = true;

    if (!email) {
      newErrors.email = messages.error.emailRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = messages.error.invalidEmail;
      isValid = false;
    }

    if (!password) {
      newErrors.password = messages.error.fillAllFields;
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = messages.error.passwordLength;
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = messages.error.fillAllFields;
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = messages.error.passwordMatch;
      isValid = false;
    }

    if (!isAgreed) {
      newErrors.agreement = messages.error.agreementRequired;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        email,
        name: email.split('@')[0],
        joinedDate: new Date().toLocaleDateString(),
        password: password,
        stats: {
          workouts: 0,
          totalTime: '0 мин',
          achievements: 0
        }
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setShowMessage(messages.success.profileSaved);
      setTimeout(() => {
        router.push('/home?registered=true');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone md:[box-shadow:0_0_20px_10px_rgba(249,115,22,0.25)] lg:rounded-3xl p-5 sm:p-6 md:p-8">

          <div className="flex justify-start mb-6 md:mb-8">
            <Logo disableLink={true} />
          </div>

          {showMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-500 rounded-2xl text-green-700 text-sm text-center">
              {showMessage}
            </div>
          )}

          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">Создание нового аккаунта</h1>
            <p className="text-sm text-secondary">Давайте начнем наше знакомство.</p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md lg:max-w-lg space-y-4">
                <InputField
                  type="email"
                  hint="Email"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-xs text-warning -mt-2">{errors.email}</p>
                )}

                <InputField
                  type="password"
                  hint="Пароль"
                  value={password}
                  onChange={setPassword}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-xs text-warning -mt-2">{errors.password}</p>
                )}

                <InputField
                  type="password"
                  hint="Повторите пароль"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-warning -mt-2">{errors.confirmPassword}</p>
                )}

                <div className="pt-2">
                  <Checkbox
                    label="Я согласен на обработку персональных данных"
                    checked={isAgreed}
                    onChange={setIsAgreed}
                  />
                </div>

                {errors.agreement && (
                  <p className="text-xs text-warning -mt-2">{errors.agreement}</p>
                )}

                <Button
                  text="Зарегистрироваться"
                  variant="primary"
                  onClick={handleSubmit}
                />

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-secondary/20"></div>
                <span className="flex-shrink mx-4 text-sm text-secondary">или</span>
                <div className="flex-grow border-t border-secondary/20"></div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-base text-secondary">Уже есть аккаунт?</p>
                <Button
                  text="Войти"
                  variant="text"
                  href="/auth/sign-in"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}