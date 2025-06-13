import React from 'react';
import './secondary-button.css';

const SecondaryButton = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`f4-secondary-button ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default SecondaryButton;