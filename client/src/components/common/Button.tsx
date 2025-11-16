import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  icon,
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-blue-800 hover:bg-green-600 font-times text-white shadow-lg hover:shadow-xl border-2 border-blue-900",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-blue-800 border-2 border-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white border-2 border-red-500",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
