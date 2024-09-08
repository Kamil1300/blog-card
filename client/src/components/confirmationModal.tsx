import React from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white dark:bg-black p-6 rounded shadow-lg max-w-sm mx-auto dark:border-slate-400">
        <p className="mb-4 text-lg">{message}</p>
        <div className="flex justify-end space-x-3">
          <Button onClick={onClose} className="hover:bg-gray-600             dark:hover:bg-gray-300">Cancel</Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-500">Delete</Button>
        </div>
      </div>
    </div>
  );
};