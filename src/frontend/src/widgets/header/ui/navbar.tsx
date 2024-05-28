'use client';

import { BaseModal, ModalTools } from '@/features';
import { HeaderStyles, NavLink } from '@/shared';
import { clsx } from 'clsx';
import Image from 'next/image';
import { headerMap } from '../model';

interface NavBarProps {
  tools: ModalTools;
}

export function NavBar({ tools }: NavBarProps) {
  return (
    <BaseModal
      tools={tools}
      className={(isActive) =>
        clsx(HeaderStyles.navbar, isActive ? HeaderStyles.active : '')
      }
    >
      <div className={HeaderStyles.header}>
        <Image src={'/favicon.svg'} alt='icon' height={40} width={40} />
        <Image
          src={'/cross.svg'}
          alt='icon'
          height={40}
          width={40}
          onMouseUp={tools.close}
        />
      </div>
      <div className={HeaderStyles.navLinkContainer}>
        {Object.entries(headerMap).map(([name, link]) => (
          <NavLink
            href={link}
            key={name}
            onClick={tools.close}
            className={(isActive) =>
              clsx(HeaderStyles.navLink, isActive ? HeaderStyles.current : '')
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
    </BaseModal>
  );
}
