import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
}

export function Toast({ 
  show, 
  onClose, 
  message, 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}