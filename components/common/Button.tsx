import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full px-6 py-3 bg-[#6D001A] text-[#FFF9E6] font-semibold rounded-lg shadow-md hover:bg-[#7A1E1E] transition-all duration-300 transform hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] border border-transparent hover:border-[#D4AF37]/50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;