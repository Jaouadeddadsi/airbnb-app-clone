"use client";

import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  register: any;
  errors: FieldErrors;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  register,
  errors,
  type = "text",
  required,
  disabled,
}) => {
  
  return (
    <div className="relative">
      <input
        disabled={disabled}
        id={id}
        {...register(id, { required })}
        className={`
        w-full
        border-2
        p-4
        rounded-md
        peer
        outline-none
        focus:outline-none
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}

      `}
        type={type}
        placeholder=" "
      />
      <label
        className={`
        absolute
        left-2
        top-1
        transition
        peer-focus:top-1
        peer-focus:right-2
        peer-focus:text-xs
        peer-placeholder-shown:left-4
        peer-placeholder-shown:top-4
        ${errors[id] ? "text-rose-500" : "text-neutral-500"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
