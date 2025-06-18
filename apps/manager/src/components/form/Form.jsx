import { useState } from 'react';
import FormTag from './FormTag';
import SubmitButton from './SubmitButton';
import FormField from './FormField';
import ErrorList from './ErrorList';

export default function Form({definition}) {

    const { fields } = definition;

    const [formData, setFormData] = useState(
        Object.fromEntries(fields.map(field => [field.name, field.default || '']))
    );

    const [errors, setErrors] = useState([]);

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate error state (without real validation yet)
        const simulatedErrors = [
        { field: 'title', message: 'Title is required' },
        { field: 'key', message: 'Key must be unique' }
        ];

        setErrors(simulatedErrors);
        console.log('Form submitted:', formData);
    };

    return(
        <div className="f4-form">
            <FormTag onSubmit={handleSubmit}>
                <ErrorList errors={errors.map(e => e.message)} />
                
                {fields.map(field => (
                    <FormField
                        key={field.name}
                        id={`field-${field.name}`}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                ))}

                <SubmitButton />
            </FormTag>
        </div>
    )

}