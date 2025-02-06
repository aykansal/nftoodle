import { motion } from 'framer-motion';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#1A1A1A] rounded-xl p-6 max-w-md w-full border-2 border-[#FF0B7A]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#FF0B7A]">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FF0B7A] transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};
