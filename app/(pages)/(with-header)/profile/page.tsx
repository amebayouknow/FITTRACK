"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import Image from 'next/image';
import { messages } from '@/app/MocData';

export default function ProfilePage() {
  const router = useRouter();

  // Состояния для полей профиля
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // Состояния для ошибок валидации
  const [errors, setErrors] = useState({
    goal: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    general: ''
  });

  // Состояние для режима редактирования
  const [isEditing, setIsEditing] = useState(false);

  // Состояния для модальных окон
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMessage, setShowMessage] = useState<{type: 'success' | 'error' | 'info', text: string} | null>(null);

  // Состояния для смены пароля
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Состояние для подтверждения удаления
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Загрузка данных профиля при монтировании
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setGoal(profile.goal || '');
      setGender(profile.gender || '');
      setAge(profile.age || '');
      setHeight(profile.height || '');
      setWeight(profile.weight || '');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('session');
    localStorage.removeItem('session');
    router.push('/onboarding');
  };

  const validateProfile = () => {
    const newErrors = {
      goal: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      general: ''
    };
    let isValid = true;

    // Валидация цели (необязательное поле, но если заполнено - проверяем)
    if (goal && goal.length > 2) {
      newErrors.goal = 'Цель не должна превышать 2 символов';
      isValid = false;
    }

    // Валидация пола
    if (!gender) {
      newErrors.gender = 'Выберите пол';
      isValid = false;
    }

    // Валидация возраста
    if (!age) {
      newErrors.age = 'Введите возраст';
      isValid = false;
    } else {
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 100) {
        newErrors.age = 'Введите корректный возраст (1-100)';
        isValid = false;
      }
    }

    // Валидация роста
    if (!height) {
      newErrors.height = 'Введите рост';
      isValid = false;
    } else {
      const heightNum = parseInt(height);
      if (isNaN(heightNum) || heightNum < 50 || heightNum > 250) {
        newErrors.height = 'Введите корректный рост (50-250 см)';
        isValid = false;
      }
    }

    // Валидация веса
    if (!weight) {
      newErrors.weight = 'Введите вес';
      isValid = false;
    } else {
      const weightNum = parseInt(weight);
      if (isNaN(weightNum) || weightNum < 20 || weightNum > 300) {
        newErrors.weight = 'Введите корректный вес (20-300 кг)';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveChanges = () => {
    if (!validateProfile()) {
      setShowMessage({type: 'error', text: 'Проверьте правильность заполнения полей'});
      setTimeout(() => setShowMessage(null), 3000);
      return;
    }

    const profileData = {
      goal,
      gender,
      age,
      height,
      weight,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('profile', JSON.stringify(profileData));
    setIsEditing(false);
    setShowMessage({type: 'success', text: messages.success.profileSaved});
    setTimeout(() => setShowMessage(null), 3000);
  };

  const handleCancelEdit = () => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setGoal(profile.goal || '');
      setGender(profile.gender || '');
      setAge(profile.age || '');
      setHeight(profile.height || '');
      setWeight(profile.weight || '');
    } else {
      setGoal('');
      setGender('');
      setAge('');
      setHeight('');
      setWeight('');
    }
    // Сбрасываем ошибки
    setErrors({
      goal: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      general: ''
    });
    setIsEditing(false);
  };

  // Валидация пароля
  const validatePassword = () => {
    const newErrors = {
      newPassword: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!newPassword) {
      newErrors.newPassword = 'Введите новый пароль';
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Пароль должен быть не менее 6 символов';
      isValid = false;
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = 'Пароль должен содержать хотя бы одну заглавную букву';
      isValid = false;
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = 'Пароль должен содержать хотя бы одну цифру';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setPasswordErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = () => {
    if (!validatePassword()) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.password = newPassword;
    localStorage.setItem('user', JSON.stringify(user));

    setShowPasswordModal(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordErrors({ newPassword: '', confirmPassword: '' });
    setShowMessage({type: 'success', text: messages.success.passwordChanged});
    setTimeout(() => setShowMessage(null), 3000);
  };

  const handleDeleteAccount = () => {
    if (!confirmDelete) {
      setShowMessage({type: 'error', text: messages.error.confirmDelete});
      setTimeout(() => setShowMessage(null), 3000);
      return;
    }

    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('session');
    sessionStorage.removeItem('session');

    setShowDeleteModal(false);
    router.push('/onboarding');
  };

  const selectGender = (selected: string) => {
    setGender(selected);
    setErrors(prev => ({ ...prev, gender: '' }));
    setShowGenderModal(false);
  };

  return (
    <div className="min-h-screen py-6 sm:py-9 bg-main">
      <div className="w-full max-w-7xl mx-auto lg:px-8">
        <div className="bg-stone shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">

          {/* Сообщения */}
          {showMessage && (
            <div className={`mb-4 p-3 rounded-2xl text-sm text-center ${
              showMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-500' :
              showMessage.type === 'error' ? 'bg-warning/10 text-warning border border-warning' :
              'bg-blue-100 text-blue-700 border border-blue-500'
            }`}>
              {showMessage.text}
            </div>
          )}

          {/* Кнопка выхода */}
          <div className="flex justify-end mb-4 md:mb-6">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>

          {/* Аватар */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="relative">
              <Image
                src='/profile_img.png'
                width={100}
                height={100}
                alt='profile'
                className='rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'
                priority  
                loading="eager"  
              />
            </div>
          </div>

          {/* Имя и кнопка редактирования */}
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">Мусисия</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all duration-300"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Форма */}
          <div className="flex justify-center">
            <div className="w-full max-w-md lg:max-w-lg space-y-4">

              {/* Цель на неделю */}
              <div>
                <InputField
                  type="text"
                  hint="Цель на неделю"
                  value={goal}
                  onChange={setGoal}
                  disabled={!isEditing}
                  autoComplete="off"
                />
                {isEditing && errors.goal && (
                  <p className="text-xs text-warning mt-1">{errors.goal}</p>
                )}
              </div>

              {/* Пол */}
              <div>
                <button
                  onClick={() => isEditing && setShowGenderModal(true)}
                  disabled={!isEditing}
                  className={`w-full border-2 border-accent rounded-2xl px-7 py-3 text-left text-secondary bg-white transition-all duration-300 flex items-center justify-between
                    ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent/5'}
                    ${errors.gender && isEditing ? 'border-warning' : ''}
                  `}
                >
                  <span>{gender || 'Пол'}</span>
                  {isEditing && (
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
                {isEditing && errors.gender && (
                  <p className="text-xs text-warning mt-1">{errors.gender}</p>
                )}
              </div>

              {/* Возраст */}
              <div>
                <InputField
                  type="number"
                  hint="Возраст"
                  value={age}
                  onChange={setAge}
                  disabled={!isEditing}
                  autoComplete="off"
                />
                {isEditing && errors.age && (
                  <p className="text-xs text-warning mt-1">{errors.age}</p>
                )}
              </div>

              {/* Рост */}
              <div>
                <InputField
                  type="number"
                  hint="Рост (см)"
                  value={height}
                  onChange={setHeight}
                  disabled={!isEditing}
                  autoComplete="off"
                />
                {isEditing && errors.height && (
                  <p className="text-xs text-warning mt-1">{errors.height}</p>
                )}
              </div>

              {/* Вес */}
              <div>
                <InputField
                  type="number"
                  hint="Вес (кг)"
                  value={weight}
                  onChange={setWeight}
                  disabled={!isEditing}
                  autoComplete="off"
                />
                {isEditing && errors.weight && (
                  <p className="text-xs text-warning mt-1">{errors.weight}</p>
                )}
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
                      onClick={handleSaveChanges}
                    />
                  </div>
                </div>
              )}

              {/* Кнопки действий */}
              <div className="flex flex-col justify-center sm:flex-row gap-3 pt-4">
                <div className="flex-1 min-w-0">
                  <Button
                    text="Изменить пароль"
                    variant="primary"
                    onClick={() => setShowPasswordModal(true)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Button
                    text="Удалить аккаунт"
                    variant="secondary"
                    onClick={() => setShowDeleteModal(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно выхода */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-bold text-primary text-center mb-4">Выход из аккаунта</h3>
            <p className="text-sm text-secondary text-center mb-6">Вы уверены, что хотите выйти?</p>
            <div className="flex flex-col gap-3">
              <Button text="Отмена" variant="text" onClick={() => setShowLogoutModal(false)} />
              <Button text="Выйти" variant="primary" onClick={handleLogout} />
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно выбора пола */}
      {showGenderModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-bold text-primary text-center mb-4">Выберите пол</h3>
            <div className="space-y-2">
              <button 
                onClick={() => selectGender('мужской')} 
                className="w-full px-6 py-4 rounded-2xl border-2 border-accent hover:bg-accent/10 transition-all duration-300 text-left text-primary font-medium"
              >
                Мужской
              </button>
              <button 
                onClick={() => selectGender('женский')} 
                className="w-full px-6 py-4 rounded-2xl border-2 border-accent hover:bg-accent/10 transition-all duration-300 text-left text-primary font-medium"
              >
                Женский
              </button>
              <button 
                onClick={() => selectGender('другой')} 
                className="w-full px-6 py-4 rounded-2xl border-2 border-accent hover:bg-accent/10 transition-all duration-300 text-left text-primary font-medium"
              >
                Другой
              </button>
            </div>
            <button 
              onClick={() => setShowGenderModal(false)} 
              className="w-full mt-4 text-accent hover:underline"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Модальное окно смены пароля */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-bold text-primary text-center mb-4">Изменить пароль</h3>
            <div className="space-y-3">
              <div>
                <InputField 
                  type="password" 
                  hint="Новый пароль" 
                  value={newPassword} 
                  onChange={setNewPassword}
                  autoComplete="new-password"
                />
                {passwordErrors.newPassword && (
                  <p className="text-xs text-warning mt-1">{passwordErrors.newPassword}</p>
                )}
              </div>
              <div>
                <InputField 
                  type="password" 
                  hint="Подтвердите пароль" 
                  value={confirmPassword} 
                  onChange={setConfirmPassword}
                  autoComplete="new-password"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-xs text-warning mt-1">{passwordErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <Button text="Отмена" variant="text" onClick={() => setShowPasswordModal(false)} />
              <Button text="Сохранить" variant="primary" onClick={handleChangePassword} />
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно удаления аккаунта */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-bold text-primary text-center mb-4">Удалить аккаунт?</h3>
            <p className="text-sm text-secondary text-center mb-4">{messages.warning.deleteAccount}</p>
            <div className="mb-4">
              <Checkbox 
                label="Я понимаю, что удаляю аккаунт навсегда" 
                checked={confirmDelete} 
                onChange={setConfirmDelete} 
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <Button text="Отмена" variant="text" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="flex-1">
                <Button text="Удалить" variant="secondary" onClick={handleDeleteAccount} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}