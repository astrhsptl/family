'use client';

import { FormBaseLayout } from '@/features';
import { AuthStyles, BaseStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AuthLayoutProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  submit: SubmitHandler<any>;
}

export const AuthLayout = ({
  children,
  submit,
  title,
  description,
}: AuthLayoutProps) => {
  const methods = useForm();

  return (
    <section className={clsx(AuthStyles.authSection, montserrat.className)}>
      <Image
        src={'/logo-mark.svg'}
        alt='home family login space home-space family-space'
        width={120}
        height={120}
        className={AuthStyles.authLogoMark}
      />
      <h1 className={clsx(AuthStyles.authTitle)}>{title}</h1>
      <FormBaseLayout
        onSub={submit}
        methods={methods}
        className={BaseStyle.baseForm}
      >
        {children}
      </FormBaseLayout>
      <p>{description}</p>
    </section>
  );
};
