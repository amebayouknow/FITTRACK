"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();

  // Состояния для полей профиля
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // Состояние для режима редактирования
  const [isEditing, setIsEditing] = useState(false);

  // Состояния для модальных окон
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Состояния для смены пароля
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    router.push('/home');
  };

  const handleSaveChanges = () => {
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
    alert('Изменения сохранены!');
  };

  const handleCancelEdit = () => {
    // Восстанавливаем исходные данные
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
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Заполните все поля');
      return;
    }

    if (newPassword.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.password !== oldPassword) {
      alert('Неверный текущий пароль');
      return;
    }

    user.password = newPassword;
    localStorage.setItem('user', JSON.stringify(user));

    setShowPasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Пароль успешно изменен!');
  };

  const handleDeleteAccount = () => {
    if (!confirmDelete) {
      alert('Подтвердите удаление аккаунта');
      return;
    }

    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('session');
    sessionStorage.removeItem('session');

    setShowDeleteModal(false);
    router.push('/home');
  };

  const selectGender = (selected: string) => {
    setGender(selected);
    setShowGenderModal(false);
  };

  return (
    <div className="min-h-screen bg-stone">
      <div className="flex flex-col gap-4 p-9 max-w-xs mx-auto relative">

        <div className="flex justify-end">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all duration-300 hover:scale-110">
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

        <div className="flex justify-center">
          <div className="relative  flex items-center justify-center">
            <Image src='/profile_img.png' width={100} height={100} alt='gsuyfhb'/>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <h2 className="text-2xl font-bold text-primary">Мусисия</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all duration-300"
            >
              <svg
                className="w-4 h-4 text-accent"
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

        {/* Цель на неделю */}
        <div className="flex flex-col gap-2">
          <InputField
            type="text"
            hint="Цель на неделю"
            value={goal}
            onChange={setGoal}
            disabled={!isEditing}
          />
        </div>

        {/* Пол */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => isEditing && setShowGenderModal(true)}
            disabled={!isEditing}
            className={`w-full border-2 border-accent rounded-2xl px-7 py-3 text-left text-primary bg-white transition-all duration-300 flex items-center justify-between
              ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent/5'}`}
          >
            <span>{gender || 'Выберите пол'}</span>
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
        </div>

        {/* Возраст */}
        <div className="flex flex-col gap-2">
          <InputField
            type="number"
            hint="Возраст"
            value={age}
            onChange={setAge}
            disabled={!isEditing}
          />
        </div>

        {/* Рост */}
        <div className="flex flex-col gap-2">
          <InputField
            type="number"
            hint="Рост"
            value={height}
            onChange={setHeight}
            disabled={!isEditing}
          />
        </div>

        {/* Вес */}
        <div className="flex flex-col gap-2">
          <InputField
            type="number"
            hint="Вес"
            value={weight}
            onChange={setWeight}
            disabled={!isEditing}
          />
        </div>

        {/* Кнопки редактирования */}
        {isEditing && (
          <div className="flex gap-2 flex-col">
            <Button
              text="Отмена"
              variant="outline"
              onClick={handleCancelEdit}
            />
            <Button
              text="Сохранить"
              variant="primary"
              onClick={handleSaveChanges}
            />
          </div>
        )}

        {/* Кнопки действий (всегда доступны) */}
        <Button
          text="Изменить пароль"
          variant="primary"
          onClick={() => setShowPasswordModal(true)}
        />

        <Button
          text="Удалить аккаунт"
          variant="secondary"
          onClick={() => setShowDeleteModal(true)}
        />
      </div>

      {/* Модальное окно выхода */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 max-w-xs w-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-primary text-center">Выход из аккаунта</h3>

            <p className="text-sm text-secondary text-center">
              Вы уверены, что хотите выйти?
            </p>

            <div className="flex gap-2 flex-col">
              <Button
                text="Отмена"
                variant="text"
                onClick={() => setShowLogoutModal(false)}
              />
              <Button
                text="Выйти"
                variant="primary"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно выбора пола */}
      {showGenderModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 max-w-xs w-full flex flex-col gap-2">
            <h3 className="text-xl font-bold text-primary text-center mb-4">Выберите пол</h3>

            <button
              onClick={() => selectGender('male')}
              className="w-full px-6 py-4 rounded-2xl border-2 border-accent hover:bg-accent/10 transition-all duration-300 text-left text-primary font-medium"
            >
              Мужской
            </button>

            <button
              onClick={() => selectGender('female')}
              className="w-full px-6 py-4 rounded-2xl border-2 border-accent hover:bg-accent/10 transition-all duration-300 text-left text-primary font-medium"
            >
              Женский
            </button>

            <button
              onClick={() => selectGender('other')}
              className="w-full px-6 py-4 rounded-2xl border-2 border-accent hover:bg-accent/10 transition-all duration-300 text-left text-primary font-medium"
            >
              Другой
            </button>

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
          <div className="bg-stone rounded-3xl p-6 max-w-xs w-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-primary text-center">Изменить пароль</h3>

            <InputField
              type="password"
              hint="Текущий пароль"
              value={oldPassword}
              onChange={setOldPassword}
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

            <div className="flex gap-2 flex-col">
              <Button
                text="Отмена"
                variant="text"
                onClick={() => setShowPasswordModal(false)}
              />
              <Button
                text="Сохранить"
                variant="primary"
                onClick={handleChangePassword}
              />
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно удаления аккаунта */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 max-w-xs w-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-primary text-center">Удалить аккаунт?</h3>

            <p className="text-sm text-secondary text-center">
              Это действие нельзя отменить. Все ваши данные будут потеряны.
            </p>

            <Checkbox
              label="Я понимаю, что удаляю аккаунт навсегда"
              checked={confirmDelete}
              onChange={setConfirmDelete}
            />

            <div className="flex gap-2">
              <Button
                text="Отмена"
                variant="text"
                onClick={() => setShowDeleteModal(false)}
              />
              <Button
                text="Удалить"
                variant="secondary"
                onClick={handleDeleteAccount}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}