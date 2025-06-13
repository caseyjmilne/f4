import React from 'react';
import './primary-button.css';

const PrimaryButton = ({
    children,
    onClick,
    type = 'submit',
    disabled = false,
    className = '',
    ...props
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`f4-button ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default PrimaryButton;