import clsx, { ClassValue } from 'clsx';
import { FC, ReactNode } from 'react';

type DefaultButtonProps = {
  children?: ReactNode | string;
  className?: ClassValue;
  isLoading?: boolean;
} & JSX.IntrinsicElements['button'];

export const DefaultButton: FC<DefaultButtonProps> = ({
  isLoading,
  children,
  style,
  className,
  ...other
}) => {
  return (
    <button {...other} className={clsx(className)}>
      {children}
    </button>
  );
};
