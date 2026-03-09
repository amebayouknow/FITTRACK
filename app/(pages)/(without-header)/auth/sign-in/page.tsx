"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from "@/app/_Components/Logo/logo";
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
                <div className="w-full max-w-7xl mx-auto lg:px-8">
                    <div className="bg-white md:bg-stone sm:shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">
                        <div className="flex justify-center">
                            <Logo />
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
            newErrors.email = 'Введите email';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Введите корректный email';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Введите пароль';
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
                setErrors({ ...errors, general: 'Пользователь не найден' });
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
                setErrors({ ...errors, general: 'Неверный email или пароль' });
            }
        } catch (error) {
            setErrors({ ...errors, general: 'Ошибка при входе' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRequestReset = async () => {
        if (!resetEmail) {
            setErrors({ ...errors, general: 'Введите email' });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(resetEmail)) {
            setErrors({ ...errors, general: 'Введите корректный email' });
            return;
        }

        setIsLoading(true);

        try {
            const savedUser = localStorage.getItem('user');
            const user = savedUser ? JSON.parse(savedUser) : null;

            if (!user || user.email !== resetEmail) {
                setErrors({ ...errors, general: 'Пользователь с таким email не найден' });
                return;
            }

            const code = Math.floor(100000 + Math.random() * 900000).toString();

            localStorage.setItem('resetData', JSON.stringify({
                email: resetEmail,
                code: code,
                expires: Date.now() + 15 * 60 * 1000
            }));

            console.log('========== КОД ВОССТАНОВЛЕНИЯ ==========');
            console.log(`Email: ${resetEmail}`);
            console.log(`Код: ${code}`);
            console.log('=========================================');

            alert(`Код восстановления отправлен на ${resetEmail}\n(В консоли браузера)`);

            setStep('reset');

        } catch (error) {
            setErrors({ ...errors, general: 'Ошибка при отправке кода' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!resetCode || !newPassword || !confirmPassword) {
            setErrors({ ...errors, general: 'Заполните все поля' });
            return;
        }

        if (newPassword.length < 6) {
            setErrors({ ...errors, general: 'Пароль должен быть не менее 6 символов' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrors({ ...errors, general: 'Пароли не совпадают' });
            return;
        }

        setIsLoading(true);

        try {
            const resetData = JSON.parse(localStorage.getItem('resetData') || '{}');

            if (!resetData.code) {
                setErrors({ ...errors, general: 'Код не найден. Запросите новый код.' });
                return;
            }

            if (resetData.code !== resetCode) {
                setErrors({ ...errors, general: 'Неверный код' });
                return;
            }

            if (resetData.expires < Date.now()) {
                setErrors({ ...errors, general: 'Код истек. Запросите новый код.' });
                return;
            }

            const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
            savedUser.password = newPassword;
            localStorage.setItem('user', JSON.stringify(savedUser));

            localStorage.removeItem('resetData');

            alert('Пароль успешно изменен!');

            setStep('login');
            setResetEmail('');
            setResetCode('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            setErrors({ ...errors, general: 'Ошибка при сбросе пароля' });
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
                            <Logo />
                        </div>

                        {/* Заголовок */}
                        <div className="text-center mb-6 md:mb-8">
                            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">С возвращением!</h1>
                            <p className="text-sm text-secondary">Введите свои данные для входа</p>
                        </div>

                        {/* Центрирование формы */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-md lg:max-w-lg space-y-4">
                                
                                {errors.general && (
                                    <div className="p-3 bg-warning/10 border border-warning rounded-2xl text-warning text-sm text-center">
                                        {errors.general}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <InputField
                                        type="email"
                                        hint="Email"
                                        value={email}
                                        onChange={setEmail}
                                    />

                                    <InputField
                                        type="password"
                                        hint="Пароль"
                                        value={password}
                                        onChange={setPassword}
                                    />

                                    <Button
                                        text={isLoading ? "Вход..." : "Войти"}
                                        variant="primary"
                                        type="submit"
                                    />
                                </form>

                                {/* Кнопка забыли пароль */}
                                <div className="flex justify-center pt-2">
                                    <Button
                                        text="Забыли пароль?"
                                        variant="text"
                                        onClick={() => setStep('request')}
                                    />
                                </div>

                                {/* Разделитель */}
                                <div className="relative flex items-center py-2">
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
                            <Logo />
                        </div>

                        {/* Заголовок */}
                        <div className="text-center mb-6 md:mb-8">
                            <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">Восстановление пароля</h1>
                            <p className="text-sm text-secondary">Введите email, мы отправим код подтверждения</p>
                        </div>

                        {/* Центрирование формы */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-md lg:max-w-lg space-y-4">
                                
                                {errors.general && (
                                    <div className="p-3 bg-warning/10 border border-warning rounded-2xl text-warning text-sm text-center">
                                        {errors.general}
                                    </div>
                                )}

                                <InputField
                                    type="email"
                                    hint="Email"
                                    value={resetEmail}
                                    onChange={setResetEmail}
                                />

                                <Button
                                    text={isLoading ? "Отправка..." : "Отправить код"}
                                    variant="primary"
                                    onClick={handleRequestReset}
                                />

                                <div className="flex justify-center pt-2">
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
        );
    }

    // Экран ввода нового пароля
    return (
        <div className="min-h-screen py-6 sm:py-9 bg-stone md:bg-main">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-stone shadow-lg sm:shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">
                    
                    {/* Логотип */}
                    <div className="flex justify-center mb-6 md:mb-8">
                        <Logo />
                    </div>

                    {/* Заголовок */}
                    <div className="text-center mb-6 md:mb-8">
                        <h1 className="text-2xl sm:text-3xl text-accent font-bold mb-2">Новый пароль</h1>
                        <p className="text-sm text-secondary">Введите код из письма и новый пароль</p>
                    </div>

                    {/* Центрирование формы */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-md lg:max-w-lg space-y-4">
                            
                            {errors.general && (
                                <div className="p-3 bg-warning/10 border border-warning rounded-2xl text-warning text-sm text-center">
                                    {errors.general}
                                </div>
                            )}

                            <InputField
                                type="text"
                                hint="Код из письма"
                                value={resetCode}
                                onChange={setResetCode}
                            />

                            <InputField
                                type="password"
                                hint="Новый пароль"
                                value={newPassword}
                                onChange={setNewPassword}
                            />

                            <InputField
                                type="password"
                                hint="Подтвердите пароль"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />

                            <Button
                                text={isLoading ? "Сохранение..." : "Сохранить новый пароль"}
                                variant="primary"
                                onClick={handleResetPassword}
                            />

                            <div className="flex justify-center pt-2">
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
    );
}