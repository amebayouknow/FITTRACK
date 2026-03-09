import Logo from "../Logo/logo";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu/burgermenu";
import './header.css';

export default function Header(){
    return (
        <div className='nav flex items-center justify-between px-2 py-8 relative z-30'>
            <Logo />
            <ul className='hidden lg:flex text-2xl flex-row gap-10'>
                <li><Link href="/home">Главная</Link></li>
                <li><Link href="/workout">Тренировки</Link></li>
                <li><Link href="/report">Отчеты</Link></li>
            </ul>
            <a href="/profile" className='hidden lg:block'>
                <img className='w-auto p-4 max-h-20 object-contain block' src="/profile.png" alt="Профиль" />
            </a>
            <div className="block lg:hidden">
                <BurgerMenu />
            </div>
        </div>
    );
}