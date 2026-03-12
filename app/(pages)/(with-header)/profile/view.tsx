"use client";

import { useEffect, useState } from "react";
import Leave from "./_components/Leave";
import Avatar from "./_components/Avatar";
import DeleteAccount from "./_components/DeleteAccount";
import { IProfileProps } from "./page";
import Form from "./_components/Form";

export default function View({ profile }: { profile: IProfileProps }) {
  const [showMessage, setShowMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen py-6 sm:py-9 bg-main">
      <div className="w-full max-w-7xl mx-auto lg:px-8">
        <div className="bg-stone shadow-custom lg:rounded-3xl p-5 sm:p-6 md:p-8">
          {/* Сообщения */}
          {showMessage && (
            <div
              className={`mb-4 p-3 rounded-2xl text-sm text-center ${"bg-green-100 text-green-700 border border-green-500"}`}
            >
              {showMessage}
            </div>
          )}

          {/* Кнопка выхода */}
          <Leave />

          {/* Аватар */}
          <Avatar setIsEditing={setIsEditing} />

          {/* Форма */}
          <Form profile={profile} isEditing={isEditing} setIsEditing={setIsEditing}/>

          {/* Кнопки */}
          <div className="flex flex-col justify-center sm:flex-row gap-3 pt-4 w-full max-w-md lg:max-w-lg space-y-4 mx-auto">
            {/* <ChangePasswordButton /> */}
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
