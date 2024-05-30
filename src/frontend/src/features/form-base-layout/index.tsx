'use client';

import { ReactNode } from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

type FormBaseLayoutProps = {
  children?: ReactNode;
  methods: UseFormReturn<any, unknown, undefined>;
  onSub: SubmitHandler<any>;
} & JSX.IntrinsicElements['form'];

export const FormBaseLayout = ({
  onSub,
  children,
  methods,
  ...props
}: FormBaseLayoutProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSub)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};
