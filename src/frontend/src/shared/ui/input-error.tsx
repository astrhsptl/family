import Image from 'next/image';
import React from 'react';

interface InputErrorProps {
  message: string;
}

export const InputError: React.FC<InputErrorProps> = ({ message }) => {
  return (
    <div>
      <Image height={14} width={14} src='/message-alert.svg' alt='Alert' />
      {message}
    </div>
  );
};
