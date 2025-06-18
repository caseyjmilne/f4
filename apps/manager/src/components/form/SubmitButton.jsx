export default function SubmitButton({ label = 'Submit', disabled = false, loading = false }) {
  return (
    <button
      type="submit"
      className="f4-button f4-button--submit"
      disabled={disabled || loading}
    >
      {loading ? 'Submitting...' : label}
    </button>
  );
}
