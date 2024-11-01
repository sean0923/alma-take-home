'use client';

import Image from 'next/image';
import AlmaLogo from '../../../public/alma-logo.png';
import { Avatar, Menu } from '@mantine/core';

export const AdminNav = () => {
  return (
    <div className="flex h-screen w-[280px] flex-col border-r p-8">
      <div className="">
        <Image className="mb-16 w-20" src={AlmaLogo} alt="alma-logo" />

        <div className="space-y-4 text-lg">
          <div className="cursor-pointer font-bold">Leads</div>
          <div className="cursor-pointer">Settings</div>
        </div>
      </div>

      <Menu position="top-start" width={200}>
        <Menu.Target>
          <div className="mt-auto flex cursor-pointer items-center gap-4 font-bold">
            <Avatar name="A" />
            <div>Admin</div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item color="red">Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
