"use client";

import Button from "@/app/_Components/Button/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Leave() {
  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const  handleLogout = async () => {
    // Не забыть написать выход
    try{
      await fetch("/api/auth/leave")
    } catch (error){
      console.log(error)
    } finally {
      router.push("/");
    }
  };

  return (
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

      {showLogoutModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-bold text-primary text-center mb-4">
              Выход из аккаунта
            </h3>
            <p className="text-sm text-secondary text-center mb-6">
              Вы уверены, что хотите выйти?
            </p>
            <div className="flex flex-col gap-3">
              <Button
                text="Отмена"
                variant="text"
                onClick={() => setShowLogoutModal(false)}
              />
              <Button text="Выйти" variant="primary" onClick={handleLogout} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
