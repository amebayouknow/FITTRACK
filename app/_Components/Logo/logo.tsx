import Link from 'next/link';

export default function Logo() {
    return (
        <div className="logo-container">
            <Link href="/home" className="logo-link">
                <h1 className='text-5xl'>
                    <span className='text-accent'>Fit</span>Track
                </h1>
            </Link>
        </div>
    );
}