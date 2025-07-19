import React from 'react';

// type CustomButtonProps = {
//   children: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
//   type?: 'button' | 'submit' | 'reset';
//   disabled?: boolean;
// };

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  return (
    // <button
    //   type={type}
    //   onClick={onClick}
    //   disabled={disabled}
    //   className={`
    //     px-6 py-3 rounded-md font-medium text-white
    //     bg-blue-600 hover:bg-blue-700 active:bg-blue-800
    //     shadow-md hover:shadow-lg active:shadow-inner
    //     transition-all duration-150 ease-in-out
    //     focus:outline-none focus:ring-2 focus:ring-blue-400
    //     disabled:opacity-50 disabled:cursor-not-allowed
    //     ${className}
    //   `}
    // >
    //   {children}
    // </button>

    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-1 border border-gray-200 rounded-xl
        bg-white
        hover:shadow-sm active:shadow-inner
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-gray-300
        ${className}
      `}>
      {children}
    </button>
  );
};

export default CustomButton;
