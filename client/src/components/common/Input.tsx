import React from "react";

interface InputProps {
  type?: "text" | "number";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  disabled?: boolean;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (type === "number") {
      // Allow empty string for clearing
      if (newValue === "") {
        onChange("");
        return;
      }

      // Only allow digits (0-9), no negative, no decimals, no special chars
      if (/^\d+$/.test(newValue)) {
        onChange(newValue);
      }
      // If invalid, don't update (reject the input)
      return;
    }

    // For text type, allow anything
    onChange(newValue);
  };

  const baseStyles =
    "w-full px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 border-2";
  const errorStyles = error ? "border-red-500" : "border-blue-200";

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseStyles} ${errorStyles}`}
    />
  );
};

export default Input;
