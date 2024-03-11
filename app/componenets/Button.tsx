"use client"

import { IconType } from "react-icons";

interface ButtonProps {
  actionLabel: string;
  action: (e:React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  icon?: IconType,
  disabled?: boolean,
}

const Button:React.FC<ButtonProps> = ({
  actionLabel,
  action,
  outline,
  icon: Icon,
  disabled = false
}) => {
  return ( 
    <button
      onClick={action}
      className={`
        relative
        w-full
        px-4
        py-3
        text-center
        font-semibold
        rounded-md
        hover:opacity-75
        transition
        border-2
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        
      `}
    >
      {actionLabel}
      <div
        className="
          absolute
          left-4
          top-[50%]
          -translate-y-[50%]
        "
      >
        {Icon && (
          <Icon size={24}/>
        )}
      </div>
    </button>
   );
}
 
export default Button;