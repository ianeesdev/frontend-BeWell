import React from "react";

interface InputFieldProps {
  type?: "text" | "email" | "password" | string;
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
  rows?: number;
  required?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  className,
  onChange,
  isTextArea = false,
  rows = 3,
  required,
  ...rest
}) => {
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <InputComponent
      rows={isTextArea ? rows : undefined}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-full w-full text-lg border border-gray-300 px-6 py-3 ${className}`}
      required
      {...rest}
    />
  );
};

export default InputField;
