import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const variantIcons = {
  destructive: <XCircle className="mr-2 h-5 w-5 text-red-500" />,
  success: <CheckCircle className="mr-2 h-5 w-5 text-green-500" />,
  info: <Info className="mr-2 h-5 w-5 text-blue-500" />,
  warning: <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />,
};

const variantClasses = {
  destructive: 'bg-red-100 text-red-700',
  success: 'bg-green-100 text-green-700',
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-yellow-100 text-yellow-700',
};

const CustomAlert = ({ title, children, variant = 'info', onClose }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg flex items-start ${variantClasses[variant]}`}>
      <div className="flex-shrink-0">{variantIcons[variant]}</div>
      <div className="ml-3 flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p>{children}</p>
      </div>
      {onClose && (
        <button
          className="ml-4 text-sm font-semibold text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default CustomAlert;
