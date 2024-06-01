'use client';

import { HeaderStyles, NavLink } from '@/shared';
import { useClientModalStatement } from '@/shared/lib/hooks/use-client-modal-statement';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { headerMap } from './model';
import { NavBar } from './ui';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const tools = useClientModalStatement();

  return (
    <header className={HeaderStyles.header} id='header'>
      <Image src={'/favicon.svg'} alt='icon' height={40} width={40} />
      <div className={HeaderStyles.homeLinkBar}>
        {Object.entries(headerMap).map(([name, link]) => (
          <NavLink
            href={link}
            key={name}
            className={(isActive) =>
              clsx(
                HeaderStyles.headerLink,
                isActive ? HeaderStyles.current : ''
              )
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
      <Image
        src={'/menu.svg'}
        alt='icon'
        height={40}
        width={40}
        onClick={tools.open}
        className={HeaderStyles.burgerMenu}
      />
      <NavBar tools={tools} />
    </header>
  );
};
