import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
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

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    // Устанавливаем cooldown на 5 минут после закрытия
    localStorage.setItem("modalCooldown", Date.now().toString());
  };

  useEffect(() => {
    // Проверяем, можно ли показать автоматическое окно
    const checkAutoPopup = () => {
      const lastCooldown = localStorage.getItem("modalCooldown");
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000; // 5 минут в миллисекундах

      // Если нет записи о cooldown или прошло больше 5 минут
      if (!lastCooldown || now - parseInt(lastCooldown) > fiveMinutes) {
        // Показываем окно через 30 секунд после загрузки
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 30000); // 30 секунд

        return () => clearTimeout(timer);
      }
    };

    checkAutoPopup();
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
