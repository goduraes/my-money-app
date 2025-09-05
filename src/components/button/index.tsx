import { ButtonHTMLAttributes } from "react";
import Loading from "../loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const Button = ({ loading, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`rounded-sm bg-sky-600 text-white leading-0 border border-sky-600 h-10 p-2 focus:outline-none
        cursor-pointer hover:bg-sky-700
        ${props.className}`}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <Loading color="white" />
        </div>
      ): (
        <span>{children}</span>
      )}
    </button>
  );
};

export default Button;
