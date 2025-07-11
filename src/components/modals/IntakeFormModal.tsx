import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GZSIntakeForm from '../interactive/GZSIntakeForm';

interface IntakeFormModalProps {
  children: React.ReactNode;
  className?: string;
}

const IntakeFormModal: React.FC<IntakeFormModalProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const trigger = (
    <div
      role="button"
      tabIndex={0}
      ref={triggerRef}
      onClick={openModal}
      onKeyDown={handleKeyDown}
      className={className}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
    >
      {children}
    </div>
  );

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-x-hidden"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-hidden bg-background border border-foreground/20 rounded-xl shadow-2xl mx-2"
          >
            <h2 id="modal-title" className="sr-only">Intake Form</h2>
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-background border-2 border-foreground/30 hover:bg-primary/5 hover:border-primary/40 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors duration-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Scrollable Content */}
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="p-0">
                <GZSIntakeForm onComplete={closeModal} isModal={true} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {trigger}
      {isMounted ? createPortal(modalContent, document.body) : null}
    </>
  );
};

export default IntakeFormModal;