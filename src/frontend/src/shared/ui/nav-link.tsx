'use client';

import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { montserrat } from '../styles';

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  className?(isActive: boolean): string;
}

export const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={
        className
          ? clsx(className(pathname === props.href), montserrat.className)
          : clsx(montserrat.className)
      }
    >
      {children}
    </Link>
  );
};
