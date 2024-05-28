'use client';

import { HeaderStyles, NavLink } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = async () => {
  return (
    <header className={HeaderStyles.header}>
      <Image src={'/favicon.svg'} alt='icon' height={40} width={40} />
      <div>
        <NavLink
          href={'/'}
          className={(isActive) =>
            clsx(HeaderStyles.headerLink, isActive ? HeaderStyles.current : '')
          }
        >
          Home
        </NavLink>
        <NavLink
          href={'/family'}
          className={(isActive) =>
            clsx(HeaderStyles.headerLink, isActive ? HeaderStyles.current : '')
          }
        >
          Family
        </NavLink>
        <NavLink
          href={'/logout'}
          className={(isActive) =>
            clsx(HeaderStyles.headerLink, isActive ? HeaderStyles.current : '')
          }
        >
          Logout
        </NavLink>
        <NavLink
          href={'/sign-up'}
          className={(isActive) =>
            clsx(HeaderStyles.headerLink, isActive ? HeaderStyles.current : '')
          }
        >
          Sign up
        </NavLink>
        <NavLink
          href={'/sign-in'}
          className={(isActive) =>
            clsx(HeaderStyles.headerLink, isActive ? HeaderStyles.current : '')
          }
        >
          Sign in
        </NavLink>
      </div>
    </header>
  );
};
