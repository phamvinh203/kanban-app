import React from "react";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
      <div className="text-red-600 text-lg font-semibold mb-2">Đã xảy ra lỗi</div>
      <div className="text-red-500 text-center mb-4">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Thử lại
        </button>
      )}
    </div>
  );
};