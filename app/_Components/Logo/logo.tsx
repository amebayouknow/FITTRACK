"use client";

import Link from "next/link";

interface LogoProps {
    disableLink?: boolean;
}

export default function Logo({ disableLink = false }: LogoProps) {
    const logoContent = (
        <h1 className='text-5xl'>
            <span className='text-accent'>Fit</span>Track
        </h1>
    );

    if (disableLink) {
        return <div className="logo-container cursor-default">{logoContent}</div>;
    }

    return (
        <Link href="/home" className="logo-link">
            {logoContent}
        </Link>
    );
}