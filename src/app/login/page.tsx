'use client';

import { useAuthContext } from '@/provider/auth-provider';
import { notifyError } from '@/utils/notification-utils';
import { Button, Fieldset, Group, PasswordInput, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const { currClientAuth, loginWithEmailAndPassword } = useAuthContext();
  const { hasAuthAttempt, user } = currClientAuth;

  // if user is logged in then push to /admin page
  useEffect(() => {
    if (!hasAuthAttempt) return;
    if (!!user) return router.push('/admin');
  }, [hasAuthAttempt, user]);

  if (!hasAuthAttempt) return null;

  return (
    <div className="mx-auto max-w-3xl text-balance p-20">
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const formData = new FormData(e.currentTarget);

            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            const isValidEmail = email.trim().length > 0;
            const isValidPassword = password.trim().length > 0;

            if (!isValidEmail) throw new Error('not valid email');
            if (!isValidPassword) throw new Error('not valid password');

            await loginWithEmailAndPassword(email, password);
          } catch (error) {
            notifyError(error);
          }

          router.push('/admin');
        }}
      >
        <Fieldset legend="Login">
          <TextInput name="email" label="Email (test@email.com)" placeholder="Email" />
          <PasswordInput
            name="password"
            label="Password (test1234)"
            placeholder="Password"
            mt="md"
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" color="dark">
              Submit
            </Button>
          </Group>
        </Fieldset>
      </form>
    </div>
  );
}
