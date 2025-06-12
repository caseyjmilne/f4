import React from 'react';

const Label = ({ htmlFor, children, className = '', ...props }) => (
    <label
        htmlFor={htmlFor}
        className={`form-label ${className}`}
        {...props}
    >
        {children}
    </label>
);

export default Label;