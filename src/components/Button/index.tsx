import clsx from "clsx";

interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ title, className, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "text-white font-medium",
        "px-5 py-2 text-lg",
        "lg:px-7 lg:py-3 lg:text-lg ",
        "hover:bg-opacity-80",
        "transition-all duration-200",
        className
      )}
      style={{ borderRadius: 10 }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
