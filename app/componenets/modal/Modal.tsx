"use client";

import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { AiFillGoogleCircle } from "react-icons/ai";

interface ModalProps {
  label: string;
  actionLabel: string;
  action: () => void;
  onClose: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  label,
  onClose,
  body,
  footer,
  actionLabel,
  action,
}) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-20
        bg-neutral-800/70
        flex
        justify-center
        items-center
      "
    >
      <div
        className="
          w-full
          md:w-3/4
          lg:w-1/2
          h-full
          md:h-auto
          rounded-lg
          bg-white
        "
      >
        <div
          className="
            w-full
            ps-4
            pe-4
            py-4
            relative
            text-center
            text-lg
            font-semibold
            border-b-[1px]
            border-b-neutral-200
          "
        >
          {label}
          <div
            onClick={onClose}
            className="
          absolute
          left-4
          top-[50%]
          -translate-y-[50%]
          cursor-pointer
          hover:opacity-75
        "
          >
            <IoMdClose size={20} />
          </div>
        </div>
        {/* body */}
        <div
          className="
          p-4
        "
        >
          {body}
          <div
            className="
          "
          >
            <Button actionLabel={actionLabel} action={action} />
          </div>
          {/* footer */}
          {footer && <div className="mt-8 border-t-[1px]">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
