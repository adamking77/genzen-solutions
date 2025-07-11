import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import GZSIntakeForm from '../interactive/GZSIntakeForm';

interface IntakeFormButtonProps {
  buttonText: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const IntakeFormButton: React.FC<IntakeFormButtonProps> = ({ 
  buttonText, 
  className = "",
  variant = "outline",
  size = "lg"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    console.log('Button clicked, opening modal');
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant}
          size={size}
          className={className}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden p-0 border-0 bg-background"
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <GZSIntakeForm onComplete={handleComplete} isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntakeFormButton;