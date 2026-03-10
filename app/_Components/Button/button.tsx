"use client";

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'outlinewhite';
    href?: string; 
    target?: string;
}

export default function Button({
    text,
    variant = "primary",
    href,
    target,
    onClick,
    disabled,
    type = "button",
    className = "",
    ...props
}: ButtonProps) {

    const baseStyles: React.CSSProperties = {
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        borderRadius: '16px',
        border: 'none',
        fontWeight: 400,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
        padding: '16px 48px',
        textDecoration: 'none',
        width: '100%',
    };

    const variantStyles = {
        primary: {
            backgroundColor: 'var(--color-accent)',
            color: '#ffffff',
        },
        secondary: {
            backgroundColor: 'var(--color-warning)',
            color: '#ffffff',
        },
        outline: {
            backgroundColor: 'transparent',
            color: 'var(--color-accent)',
            border: '3px solid var(--color-accent)',
            fontWeight: 700,  
        },
        text: {
            backgroundColor: 'transparent',
            color: 'var(--color-secondary)',
            border: 'none',
            boxShadow:'none',
            padding: '0',
            fontWeight: 400,  
        },
        outlinewhite: {
            backgroundColor: 'transparent',
            color: 'var(--color-white)',
            border: '3px solid var(--color-white)',
            fontWeight: 700,  
        },
    };

    const variantKey = variant as keyof typeof variantStyles;

    const buttonStyles: React.CSSProperties = {
        ...baseStyles,
        ...variantStyles[variantKey],
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'none';
    };

    if (href) {
        return (
            <Link 
                href={href}
                target={target}
                className={`inline-block ${className}`}
                style={buttonStyles}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props as any}
            >
                {text}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={buttonStyles}
            className={`button-component ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {text}
        </button>
    );
}