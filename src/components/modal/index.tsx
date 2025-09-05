import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

const Modal = ({ open, setOpen, children }: ModalProps) => {
  if (!open) return;

  return (
    <div className="absolute">
      <div className="absolute h-screen w-screen bg-gray-500 opacity-50 z-1" onClick={() => setOpen(!open)}></div>
      <div className="absolute h-screen w-screen flex justify-center items-center">
        <div className="h-auto w-2/4 p-6 rounded bg-white z-2">
        <div className="flex relative justify-between gap-2">
          <button onClick={() => setOpen(!open)} className="absolute top-[-10px] right-[-10px] cursor-pointer">
            <XMarkIcon className="h-6" />
          </button>
        </div>

        { children }

        </div>
      </div>
    </div>
  );
}

export default Modal;
