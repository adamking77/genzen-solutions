import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import GZSIntakeForm from '../interactive/GZSIntakeForm';

interface IntakeFormModalProps {
  trigger: React.ReactNode;
  className?: string;
}

const IntakeFormModal: React.FC<IntakeFormModalProps> = ({ trigger, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent 
        className={`max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden p-0 border-0 bg-background ${className || ''}`}
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <GZSIntakeForm onComplete={handleComplete} isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntakeFormModal;