import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <Image src={'/favicon.svg'} alt='icon' height={40} width={40} />
      <div>
        <Link href={'/dick'}>Suck my penis</Link>
      </div>
    </header>
  );
};
