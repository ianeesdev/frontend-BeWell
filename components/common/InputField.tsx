import React from 'react';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-full w-full text-lg border border-gray-300 p-4"
        {...rest}
      />
    </div>
  );
};

export default InputField;
