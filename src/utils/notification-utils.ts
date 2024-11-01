'use client';

import toast from 'react-hot-toast';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';

export const notifySuccess = (message?: string, duration = 4000) => {
  toast.success(message ? message : 'Success', { duration });
};

export const notifyError = (error: any) => {
  if (typeof error === 'string') return toast.error(`Error: ${error}`);

  if (error instanceof ZodError) {
    const validationError = fromError(error);
    // const messages = validationError.message.split(';').join('\n');
    const messages = validationError.message.split(';')[0];
    toast.error(`${messages}`);
    // console.error(messages);
  } else if (error.message) {
    if (error.message.includes('invalid-credential')) {
      return toast.error(`Error: invalid-credential`);
    }

    // console.error(error.message);
    toast.error(`Error: ${error.message}`);
  } else {
    // console.error(error);
    toast.error(`Unknown Error`);
  }
};
