export default function FormTag({
  onSubmit,
  className = '',
  children,
  ...props
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`f4-form__tag ${className}`}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
}
