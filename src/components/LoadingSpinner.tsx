const LoadingSpinner = ({ size = 40, className = "" }: { size?: number; className?: string }) => {
  return (
    <div 
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Загрузка"
    >
      <span className="sr-only">Загрузка...</span>
    </div>
  );
};

export default LoadingSpinner;