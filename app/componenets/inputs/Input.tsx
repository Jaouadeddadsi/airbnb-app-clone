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
  price?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  register,
  errors,
  type = "text",
  required,
  disabled,
  price,
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
        bg-transparent
        peer
        outline-none
        focus:outline-none
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        ${price ? "ps-8" : "ps-4"}

      `}
        type={type}
        placeholder=" "
      />
      <label
        className={`
        z-[-1]
        absolute
        text-xs
        ${price ? "left-4" : "left-2"}
        top-1
        transition
        peer-focus:top-1
        ${price ? "peer-focus:left-4" : "peer-focus:left-2"}
        peer-placeholder-shown:text-base
        peer-focus:text-xs
        ${
          price
            ? "peer-placeholder-shown:left-8"
            : "peer-placeholder-shown:left-4"
        }
        peer-placeholder-shown:top-4
        ${errors[id] ? "text-rose-500" : "text-neutral-500"}
        `}
      >
        {label}
      </label>
      {price && (
        <div
          className="
        absolute
        left-4
        top-[50%]
        -translate-y-[58%]
        font-semibold
        text-lg
      "
        >
          $
        </div>
      )}
    </div>
  );
};

export default Input;
