"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from "@/app/_Components/Logo/logo";
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState<'login' | 'request' | 'reset'>('login');

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

            // Генерируем простой код (в реальном приложении отправляем на email)
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            localStorage.setItem('resetData', JSON.stringify({
                email: resetEmail,
                code: code,
                expires: Date.now() + 15 * 60 * 1000 
            }));

            // Показываем код в консоли (в реальном приложении отправляем на email)
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
            <div className="wrapper min-h-screen flex flex-col py-9 px-4 gap-4 bg-stone">
                <Logo />

                <div>
                    <h1 className="text-2xl text-center text-accent mt-4  mb-4">С возвращением!</h1>
                    <p className="text-sm text-secondary text-center mb-4">Введите свои данные для входа</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {errors.general && (
                        <div className="p-3 bg-warning border border-warning rounded-2xl text-warning text-sm text-center">
                            {errors.general}
                        </div>
                    )}

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

                <div className="flex flex-center flex-col text-base gap-1 text-secondary mt-4 mb-4">
                    <p>Нет аккаунта?</p>
                    <Button
                        text="Зарегистрироваться"
                        variant="text"
                        href="/auth/sign-up"
                    />
                </div>
                <div className="flex flex-center">
                    <Button
                        text="Забыли пароль?"
                        variant='text'
                        onClick={() => setStep('request')}
                    >
                        
                    </Button>
                </div>
            </div>
        );
    }

    // Экран запроса кода
    if (step === 'request') {
        return (
            <div className="wrapper min-h-screen flex flex-col py-9 px-4 gap-4 bg-stone">
                <Logo />

                <div>
                    <h1 className="text-2xl text-center text-accent mb-4">Восстановление пароля</h1>
                    <p className="text-sm text-secondary text-center">Введите email, мы отправим код подтверждения</p>
                </div>

                <div className="flex flex-col gap-4">
                    {errors.general && (
                        <div className="p-3 bg-red-100 border border-red-400 rounded-2xl text-red-700 text-sm text-center">
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

                    <Button
                        text="Назад ко входу"
                        variant="text"
                        onClick={() => setStep('login')}
                    />
                </div>
            </div>
        );
    }

    // Экран ввода нового пароля
    return (
        <div className="wrapper min-h-screen flex flex-col py-9 px-4 gap-4 bg-stone">
            <Logo />

            <div>
                <h1 className="text-2xl text-center text-accent mb-4">Новый пароль</h1>
                <p className="text-sm text-secondary text-center">Введите код из письма и новый пароль</p>
            </div>

            <div className="flex flex-col gap-4">
                {errors.general && (
                    <div className="p-3 bg-red-100 border border-red-400 rounded-2xl text-red-700 text-sm text-center">
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

                <Button
                    text="Назад"
                    variant="text"
                    onClick={() => setStep('request')}
                />
            </div>
        </div>
    );
}