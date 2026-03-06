import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({
    text,
    variant = "primary",
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
    };

    const variantKey = variant as keyof typeof variantStyles;

    const buttonStyles: React.CSSProperties = {
        ...baseStyles,
        ...variantStyles[variantKey],
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={buttonStyles}
            className={`button-component ${className}`}
            onMouseEnter={(e) => {
                if (disabled) return;
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
                if (disabled) return;
                e.currentTarget.style.transform = 'none';
            }}
            {...props}
        >
            {text}
        </button>
    );
}