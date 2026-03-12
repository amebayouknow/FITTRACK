/* eslint-disable @next/next/no-img-element */

import { Dispatch, SetStateAction } from "react";

export default function Avatar({ setIsEditing}: {setIsEditing: Dispatch<SetStateAction<boolean>>}) {

  const handleEdit = () => {
    setIsEditing((prev) => !prev)
  }
  return (
    <div className="flex justify-center mb-4 md:mb-6">
      <div className="relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalPUqb1gpbBibzSAKkG_3QISmsftnXoURZEc4LCnudqiy3mazEuW48k1eBclvAs75oT0SWbRGmOdHVIBUhtYIGdCC7oqOsTz0qA8nPA&s=10"
          width={100}
          height={100}
          alt="profile"
          className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          loading="eager"
        />
      </div>
      <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">Мусисия</h2>
       
          <button
            onClick={handleEdit}
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
      </div>
    </div>
  );
}
