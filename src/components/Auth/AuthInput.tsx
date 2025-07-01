import React from "react";

type Props = {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const AuthInput: React.FC<Props> = ({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                   placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                   sm:text-sm transition duration-200 ease-in-out hover:border-gray-400"
      />
    </div>
  );
};

export default AuthInput;
