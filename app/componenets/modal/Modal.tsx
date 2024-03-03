"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
  label: string;
  actionLabel: string;
  action: () => void;
  onClose: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  label,
  onClose,
  body,
  footer,
  actionLabel,
  action,
  isOpen,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(isOpen);
    }, 300);
  }, [isOpen, setShowModal]);

  const toggele = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [setShowModal, onClose]);

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
        className={`
          w-full
          md:w-3/4
          lg:w-1/2
          xl:w-2/5
          h-full
          md:h-auto
          rounded-lg
          bg-white
          translate
          duration-300
          ${showModal ? "translate-y-0" : "translate-y-full"}
          ${showModal ? "opacity-100" : "opacity-0"}
        `}
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
          <button
            onClick={toggele}
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
          </button>
        </div>
        {/* body */}
        <div
          className="
          p-4
          pb-0
        "
        >
          {body}
          <div
            className="
            pb-6
          "
          >
            <Button actionLabel={actionLabel} action={action} />
          </div>
          {/* footer */}
          {footer && <div className="py-6 border-t-[1px]">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
