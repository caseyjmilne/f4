const exampleFormSchema = {
  id: 'user-registration',
  save: '/api/forms/user-registration', // route to submit form data
  validators: [
    {
      type: 'match',
      field1: 'password',
      field2: 'confirm_password',
      message: 'Passwords must match',
    },
    {
      type: 'custom',
      fn: 'validateAgeOver18', // could be resolved by name in validation engine
      message: 'User must be at least 18',
    },
  ],
  settings: {
    showTitle: true,
    autosave: false,
    theme: 'default',
  },
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      default: '',
      placeholder: 'Enter your username',
      validators: [
        { type: 'required', message: 'Username is required' },
        { type: 'minLength', value: 3, message: 'Must be at least 3 characters' },
      ],
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      default: '',
      validators: [
        { type: 'required', message: 'Age is required' },
        { type: 'min', value: 18, message: 'Must be 18 or older' },
      ],
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Select...', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
      default: '',
      validators: [
        { type: 'required', message: 'Please select a gender' },
      ],
    },
    {
      name: 'subscribe',
      label: 'Subscribe to newsletter?',
      type: 'true_false',
      default: false,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'text',
      inputType: 'password',
      validators: [
        { type: 'required', message: 'Password is required' },
        { type: 'minLength', value: 6, message: 'Minimum 6 characters' },
      ],
    },
    {
      name: 'confirm_password',
      label: 'Confirm Password',
      type: 'text',
      inputType: 'password',
      validators: [
        { type: 'required', message: 'Confirm your password' },
      ],
    },
  ],
};

export default exampleFormSchema;
