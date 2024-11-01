// import second from '../../public/alma-logo.png'

import { Button } from '@mantine/core';
import Link from 'next/link';
import { LuInfo } from 'react-icons/lu';

const iconSize = 60;

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-3xl text-balance p-20 text-center">
      <div className="my-8 flex flex-col items-center">
        <LuInfo color="#7D7CFF" size={iconSize} />
        <h3 className="my-4 text-xl font-bold">Thank You</h3>

        <div className="text-lg font-semibold leading-tight">
          Your information was submitted to our team of immigration attorneys. Expect an email from
          hello@tryalma.ai.
        </div>
      </div>

      <div className="mx-auto max-w-sm">
        <Link href="/" passHref legacyBehavior>
          <Button component="a" type="submit" color="dark" fullWidth>
            Go Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
