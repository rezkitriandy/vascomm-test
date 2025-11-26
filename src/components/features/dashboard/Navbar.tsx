'use client';

import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { useAuth } from '@/hooks/useAuth';
import { Power } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between bg-white px-10 py-4">
      <div className="relative h-6 w-32 overflow-hidden">
        <Image
          src="/vascomm-logo.png"
          alt="vascomm"
          fill
          className="object-contain object-center"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <div className="text-right">
          <h6 className="text-[10px] text-primary-blue">Hallo Admin,</h6>
          <h3 className="text-sm">{user?.name}</h3>
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="size-10 rounded-full bg-[#C4C4C4]" />
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={12} className="bg-white">
            <div className="flex w-full flex-col items-center">
              <div className="mb-2 size-14 rounded-full bg-[#C4C4C4]" />
              <h3 className="text-sm">{user?.name}</h3>
              <h5 className="text-[10px]">{user?.email}</h5>
              <div className="pt-4">
                <Button
                  className="!bg-transparent text-[#D83A56]"
                  onClick={() => {
                    localStorage.removeItem('currentUser');
                    window.location.href = '/auth/login';
                  }}
                >
                  <Power /> KELUAR
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
