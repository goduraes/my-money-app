import { ReactNode } from "react";
import { createPortal } from 'react-dom';

import { XMarkIcon } from "@heroicons/react/16/solid";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

const Modal = ({ open, setOpen, children }: ModalProps) => {
  if (!open) return;

  return createPortal(

    <div className={`absolute h-full w-full top-0`}>
      <div className={`absolute h-full w-full bg-gray-500 opacity-75 z-1`} onClick={() => setOpen(!open)}></div>
      <div className="absolute h-dvh w-full flex justify-center items-center">
        <div className="fixed h-auto z-2 p-4">
          <div className="w-full max-w-md p-6 rounded bg-white">
            <div className="flex relative justify-between gap-2">
              <button onClick={() => setOpen(!open)} className="absolute top-[-10px] right-[-10px] cursor-pointer">
                <XMarkIcon className="h-6" />
              </button>
            </div>

            { children }
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
