import React from 'react';

const FieldGroup = ({ children, className = '', ...props }) => (
    <div className={`f4-form__field-group ${className}`} {...props}>
        {children}
    </div>
);

export default FieldGroup;