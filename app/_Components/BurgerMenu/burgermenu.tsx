"use client";

import { useState } from 'react';
import Link from "next/link";

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        console.log('Клик по бургеру, текущее состояние:', isOpen);
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        console.log('Закрытие меню');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                className='flex flex-col justify-center items-center w-10 h-10 z-50'
                onClick={toggleMenu}
                aria-label="Меню"
            >
                <span className={`block w-6 h-0.5 bg-primary mb-1.5 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-primary mb-1.5 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-primary transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow rounded-2xl border border-gray-200 overflow-hidden z-40">
                    <ul className='flex flex-col'>
                        <li>
                            <Link 
                                href="/home" 
                                className='block py-3 px-4 text-base hover:bg-orange-50 hover:text-accent transition-colors'
                                onClick={closeMenu}
                            >
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/workout" 
                                className='block py-3 px-4 text-base hover:bg-orange-50 hover:text-accent transition-colors'
                                onClick={closeMenu}
                            >
                                Тренировки
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/report" 
                                className='block py-3 px-4 text-base hover:bg-orange-50 hover:text-accent transition-colors'
                                onClick={closeMenu}
                            >
                                Отчеты
                            </Link>
                        </li>
                        <li className='border-t border-gray-200'>
                            <Link 
                                href="/profile" 
                                className='flex items-center gap-2 py-3 px-4 text-base hover:bg-orange-50 hover:text-accent transition-colors'
                                onClick={closeMenu}
                            >
                                <img className='w-5 h-5 object-contain' src="/profile.png" alt="Профиль" />
                                <span>Профиль</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}