"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from "@/app/_Components/Logo/logo";
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import { messages } from '@/app/MocData';

export default function LoginPage() {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState<'login' | 'request' | 'reset'>('login');
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
            general: ''
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
            newErrors.password = messages.error.fillAllFields.split(' ')[0] + ' пароль';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({ email: '', password: '', general: '' });

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const savedUser = localStorage.getItem('user');

            if (!savedUser) {
                setErrors({ ...errors, general: messages.error.userNotFound });
                return;
            }

            const user = JSON.parse(savedUser);

            if (user.email === email && user.password === password) {
                sessionStorage.setItem('session', JSON.stringify({
                    email: user.email,
                    name: user.name,
                    loggedIn: true
                }));

                router.push('/home');
            } else {
                setErrors({ ...errors, general: messages.error.wrongCredentials });
            }
        } catch (error) {
            setErrors({ ...errors, general: messages.error.userNotFound });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRequestReset = async () => {
        if (!resetEmail) {
            setErrors({ ...errors, general: messages.error.emailRequired });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(resetEmail)) {
            setErrors({ ...errors, general: messages.error.invalidEmail });
            return;
        }

        setIsLoading(true);

        try {
            const savedUser = localStorage.getItem('user');
            const user = savedUser ? JSON.parse(savedUser) : null;

            if (!user || user.email !== resetEmail) {
                setErrors({ ...errors, general: messages.error.userNotFound });
                return;
            }

            const code = Math.floor(100000 + Math.random() * 900000).toString();

            localStorage.setItem('resetData', JSON.stringify({
                email: resetEmail,
                code: code,
                expires: Date.now() + 15 * 60 * 1000
            }));

            setShowMessage(messages.info.resetCodeSent(resetEmail));
            setTimeout(() => setShowMessage(null), 5000);
            setStep('reset');

        } catch (error) {
            setErrors({ ...errors, general: messages.error.userNotFound });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!resetCode || !newPassword || !confirmPassword) {
            setErrors({ ...errors, general: messages.error.fillAllFields });
            return;
        }

        if (newPassword.length < 6) {
            setErrors({ ...errors, general: messages.error.passwordLength });
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrors({ ...errors, general: messages.error.passwordMatch });
            return;
        }

        setIsLoading(true);

        try {
            const resetData = JSON.parse(localStorage.getItem('resetData') || '{}');

            if (!resetData.code) {
                setErrors({ ...errors, general: messages.error.codeNotFound });
                return;
            }

            if (resetData.code !== resetCode) {
                setErrors({ ...errors, general: messages.error.invalidCode });
                return;
            }

            if (resetData.expires < Date.now()) {
                setErrors({ ...errors, general: messages.error.codeExpired });
                return;
            }

            const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
            savedUser.password = newPassword;
            localStorage.setItem('user', JSON.stringify(savedUser));

            localStorage.removeItem('resetData');

            setShowMessage(messages.success.passwordChanged);
            setTimeout(() => setShowMessage(null), 3000);

            setStep('login');
            setResetEmail('');
            setResetCode('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            setErrors({ ...errors, general: messages.error.userNotFound });
        } finally {
            setIsLoading(false);
        }
    };

    // Экран входа
    if (step === 'login') {
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
                            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">С возвращением!</h1>
                            <p className="text-sm text-secondary">Введите свои данные для входа</p>
                        </div>

                        {/* Форма */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-md lg:max-w-lg">

                                {errors.general && (
                                    <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-2xl text-warning text-sm text-center">
                                        {errors.general}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <InputField
                                            type="email"
                                            hint="Email"
                                            value={email}
                                            onChange={setEmail}
                                            autoComplete="email"
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-warning mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <InputField
                                            type="password"
                                            hint="Пароль"
                                            value={password}
                                            onChange={setPassword}
                                            autoComplete="current-password"
                                        />
                                        {errors.password && (
                                            <p className="text-xs text-warning mt-1">{errors.password}</p>
                                        )}
                                    </div>

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
                                        onClick={() => setStep('request')}
                                    />
                                </div>

                                {/* Разделитель */}
                                <div className="relative flex items-center py-4">
                                    <div className="flex-grow border-t border-secondary/20"></div>
                                    <span className="flex-shrink mx-4 text-sm text-secondary">или</span>
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

    // Экран запроса кода
    if (step === 'request') {
        return (
            <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-stone shadow-lg sm:shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">

                        {/* Логотип */}
                        <div className="flex justify-center mb-6 md:mb-8">
                            <Logo disableLink={true} />
                        </div>

                        {/* Заголовок */}
                        <div className="text-center mb-6 md:mb-8">
                            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">Восстановление пароля</h1>
                            <p className="text-sm text-secondary">Введите email, мы отправим код подтверждения</p>
                        </div>

                        {/* Форма */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-md lg:max-w-lg">

                                {errors.general && (
                                    <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-2xl text-warning text-sm text-center">
                                        {errors.general}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <InputField
                                        type="email"
                                        hint="Email"
                                        value={resetEmail}
                                        onChange={setResetEmail}
                                        autoComplete="email"
                                    />

                                    <Button
                                        text={isLoading ? "Отправка..." : "Отправить код"}
                                        variant="primary"
                                        onClick={handleRequestReset}
                                    />

                                    <div className="flex justify-center">
                                        <Button
                                            text="Назад ко входу"
                                            variant="text"
                                            onClick={() => setStep('login')}
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

    // Экран ввода нового пароля
    return (
        <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-stone shadow-lg sm:shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">

                    {/* Логотип */}
                    <div className="flex justify-center mb-6 md:mb-8">
                        <Logo disableLink={true} />
                    </div>
                    {/* Сообщения */}
                    {showMessage && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-500 rounded-2xl text-green-700 text-sm text-center">
                            {showMessage}
                        </div>
                    )}
                    {/* Заголовок */}
                    <div className="text-center mb-6 md:mb-8">
                        <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">Новый пароль</h1>
                        <p className="text-sm text-secondary">Введите код из письма и новый пароль</p>
                    </div>

                    {/* Форма */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-md lg:max-w-lg">

                            {errors.general && (
                                <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-2xl text-warning text-sm text-center">
                                    {errors.general}
                                </div>
                            )}

                            <div className="space-y-4">
                                <InputField
                                    type="text"
                                    hint="Код из письма"
                                    value={resetCode}
                                    onChange={setResetCode}
                                    autoComplete="one-time-code"
                                />

                                <InputField
                                    type="password"
                                    hint="Новый пароль"
                                    value={newPassword}
                                    onChange={setNewPassword}
                                    autoComplete="new-password"
                                />

                                <InputField
                                    type="password"
                                    hint="Подтвердите пароль"
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                    autoComplete="new-password"
                                />

                                <Button
                                    text={isLoading ? "Сохранение..." : "Сохранить новый пароль"}
                                    variant="primary"
                                    onClick={handleResetPassword}
                                />

                                <div className="flex justify-center">
                                    <Button
                                        text="Назад"
                                        variant="text"
                                        onClick={() => setStep('request')}
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