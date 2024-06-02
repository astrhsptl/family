'use client';

import { FormBaseLayout } from '@/features';
import { createFamily } from '@/features/new-family';
import {
  BaseStyle,
  DefaultButton,
  DefaultInput,
  NewFamilyStyles,
  montserrat,
} from '@/shared';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Family {
  last_name: string;
}

export const NewFamilyLayout = () => {
  const submitHandler: SubmitHandler<Family> = (data) => {
    createFamily(data);
  };
  const methods = useForm<Family>();

  return (
    <section className={NewFamilyStyles.familyLayout}>
      <h1 className={clsx(montserrat.className, NewFamilyStyles.title)}>
        Create new family
      </h1>
      <FormBaseLayout
        methods={methods}
        onSub={submitHandler}
        className={BaseStyle.baseForm}
      >
        <DefaultInput
          name='last_name'
          placeholder='Last name'
          icon='/user.svg'
          registerOptions={{
            required: {
              message: 'Last name are required',
              value: true,
            },
          }}
        />
        <DefaultButton>Create</DefaultButton>
      </FormBaseLayout>
    </section>
  );
};
