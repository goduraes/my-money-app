import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  message?: string;
  error?: boolean;
}

const Input = ({ label, message, error, ...props }: InputProps) => {
  return (
    <div>
      {label && (
        <label className={`block text-sm mb-0.5 ${ error ? 'text-red-600' : 'text-gray-600' }`} htmlFor={props.id}>
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full rounded-sm border text-gray-600 h-10 p-2 focus:outline-none
        ${ error ? 'border-red-600' : 'border-sky-600' }
        ${props.className}`}
      />

      {message && <span className={`block text-xs mt-0.5 ${ error ? 'text-red-600' : 'text-gray-600' }`}>{message}</span>}
    </div>
  )
}

export default Input;
