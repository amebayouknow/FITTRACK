import Button from "@/app/_Components/Button/button";
import Checkbox from "@/app/_Components/Checkbox/checkbox";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccount() {
  const router = useRouter();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteAccount = async () => {
    console.log("as")
    if(!confirmDelete){
      return;
    }

    try{
      await fetch("/api/auth/delete", {
        method: "POST",
        body: JSON.stringify({userId: "dc1d64cb-b59f-4d7c-ac35-709533404e44"})
      })
      await fetch("/api/auth/leave")
    } catch (error){
      console.log(error)
    } finally {
        router.push("/");
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <Button
        text="Удалить аккаунт"
        variant="secondary"
        onClick={() => setShowDeleteModal(true)}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone rounded-3xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-bold text-primary text-center mb-4">
              Удалить аккаунт?
            </h3>
            <p className="text-sm text-secondary text-center mb-4">
              {/* {messages.warning.deleteAccount} */}
            </p>
            <div className="mb-4">
              <Checkbox
                label="Я понимаю, что удаляю аккаунт навсегда"
                checked={confirmDelete}
                onChange={setConfirmDelete}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1">
                <Button
                  text={confirmDelete ? "Удалить" : "Подтвердите удаление"}
                  variant="secondary"
                  onClick={handleDeleteAccount}
                  disabled={!confirmDelete}
                />
              </div>
              <div className="flex-1">
                <Button
                  text="Отмена"
                  variant="text"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
