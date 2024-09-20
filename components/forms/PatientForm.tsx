'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// shadcn/ui components
import { Form } from '@/components/ui/form';
// components
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
// validate form
import { UserFormValidation } from '@/lib/validation';
import { createUser } from '@/lib/actions/patient.actions';

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // validate form using zod and react-hook-form
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  // // use in the future
  // const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
  //   setIsLoading(true);

  //   try {
  //     const user = {
  //       name: values.name,
  //       email: values.email,
  //       phone: values.phone,
  //     };

  //     const { exists, user: newUser } = await createUser(user);

  //     if (exists) {
  //       // Cập nhật lỗi cho trường email trong form
  //       form.setError('email', {
  //         type: 'manual',
  //         message: 'Email đã tồn tại. Vui lòng sử dụng email khác.',
  //       });
  //     } else {
  //       if (newUser) {
  //         router.push(`/patients/${newUser.$id}/register`);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setIsLoading(false);
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome to Pulse Health</h1>
          <p className="text-dark-700">Schedule Your Appointments</p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Full Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email Address"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
