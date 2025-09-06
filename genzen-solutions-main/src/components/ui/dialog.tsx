import React, { useEffect } from 'react';

const Dialog = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  const handleOverlayClick = () => {
    onOpenChange(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div onClick={handleContentClick}>{children}</div>
    </div>
  );
};

const DialogContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg ${
      className || ''
    }`}
  >
    {children}
  </div>
);

export { Dialog, DialogContent };