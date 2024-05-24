import { FC, ReactNode } from 'react';

interface SomeoneProps {
  children: ReactNode;
}

const SomeoneTemplate: FC<SomeoneProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SomeoneTemplate;
