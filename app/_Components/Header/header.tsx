import Logo from "../Logo/logo";
import './header.css';

export default function Header(){
    return(
        <div className='nav flex items-center justify-between px-2 py-8 mb-10'>
            <Logo />
            <ul className='text-2xl flex flex-row gap-10'>
                <li><a href="">Главная</a></li>
                <li><a href="">Тренировки</a></li>
                <li><a href="">Отчеты</a></li>
            </ul>
            <a href=""><img className='w-auto p-4 max-h-20 object-contain block' src="/profile.png" alt="Профиль" /></a>
        </div>
    );
}