import React from 'react';

const CustomAlert = ({ title, children, variant = 'default' }) => {
  const baseClasses = "border px-4 py-3 rounded relative";
  const variantClasses = {
    default: "bg-blue-100 border-blue-500 text-blue-700",
    destructive: "bg-red-100 border-red-500 text-red-700",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`} role="alert">
      {title && <strong className="font-bold">{title}</strong>}
      <span className="block sm:inline">{children}</span>
    </div>
  );
};

export default CustomAlert;