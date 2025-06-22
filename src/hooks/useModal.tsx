import { useState, createContext, useContext, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  consultationModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [consultationIsOpen, setConsultationIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const consultationModal = {
    isOpen: consultationIsOpen,
    open: () => setConsultationIsOpen(true),
    close: () => setConsultationIsOpen(false),
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        consultationModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
