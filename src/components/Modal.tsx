import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  ReactNode,
} from "react";

// Define the type for the methods we will expose
export interface ModalHandles {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  title: string;
  children: ReactNode;
}

// A simple modal component that can be opened and closed
const Modal = forwardRef<ModalHandles, ModalProps>(
  ({ title, children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    // Exposing methods to the parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-4 right-4 text-lg font-bold text-red-900"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <>{children}</>
          </div>
        </div>
      )
    );
  }
);

export default Modal;
