import Button from "@/app/_Components/Button/button";
import InputField from "@/app/_Components/Input/input";
import { useState } from "react";

export default function ChangePasswordButton() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  // Состояния для смены пароля
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

    const validatePassword = () => {
      const newErrors = {
        newPassword: "",
        confirmPassword: "",
      };
      let isValid = true;
  
      if (!newPassword) {
        newErrors.newPassword = "Введите новый пароль";
        isValid = false;
      } else if (newPassword.length < 6) {
        newErrors.newPassword = "Пароль должен быть не менее 6 символов";
        isValid = false;
      } else if (!/[A-Z]/.test(newPassword)) {
        newErrors.newPassword =
          "Пароль должен содержать хотя бы одну заглавную букву";
        isValid = false;
      } else if (!/[0-9]/.test(newPassword)) {
        newErrors.newPassword = "Пароль должен содержать хотя бы одну цифру";
        isValid = false;
      }
  
      if (!confirmPassword) {
        newErrors.confirmPassword = "Подтвердите пароль";
        isValid = false;
      } else if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
        isValid = false;
      }
  
      setPasswordErrors(newErrors);
      return isValid;
    };

    const handleChangePassword = () => {
      if (!validatePassword()) {
        return;
      }
  
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.password = newPassword;
      localStorage.setItem("user", JSON.stringify(user));
  
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordErrors({ newPassword: "", confirmPassword: "" });
      setShowMessage({ type: "success", text: messages.success.passwordChanged });
      setTimeout(() => setShowMessage(null), 3000);
    };

  return (
    <div className="flex-1 min-w-0">
      <Button
        text="Изменить пароль"
        variant="primary"
        onClick={() => setShowPasswordModal(true)}
      />
      {showPasswordModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-bold text-primary text-center mb-4">
              Изменить пароль
            </h3>
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
                  <p className="text-xs text-warning mt-1">
                    {passwordErrors.newPassword}
                  </p>
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
                  <p className="text-xs text-warning mt-1">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
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
    </div>
  );
}
