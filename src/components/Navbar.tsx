'use client';

import { useAuth } from '@/hooks/useAuth';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/Button';

const Navbar = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-b border-[#E4E4E4] px-10 py-4">
      <div className="relative h-7 w-[168px] overflow-hidden">
        <Image
          src="/vascomm-logo.png"
          alt="vascomm"
          fill
          className="object-contain object-center"
        />
      </div>
      <div className="relative w-[662px]">
        <input
          type="text"
          placeholder="Cari parfum kesukaanmu"
          className="w-full rounded-[2px] bg-low-grey px-4 py-2 text-xs placeholder:text-primary-grey focus-visible:outline-none"
        />
        <Search
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex items-center gap-x-4">
        {isLoggedIn ? (
          <>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem('currentUser');
                window.location.href = '/';
              }}
            >
              KELUAR
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/auth/login">MASUK</Link>
            </Button>
            <Button>DAFTAR</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
