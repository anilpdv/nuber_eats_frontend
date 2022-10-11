interface IButtonProps {
  loading: boolean;
  isValid: boolean;
  actionText: string;
}

export default function Button({ loading, isValid, actionText }: IButtonProps) {
  return (
    <button
      className={`mt-3 btn ${
        isValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-300"
      }`}
    >
      {loading ? "loading..." : actionText}
    </button>
  );
}
