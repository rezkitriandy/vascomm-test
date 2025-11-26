'use client';

import { DASHBOARD_MENU } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full w-[250px] shrink-0 overflow-y-auto bg-white">
      {DASHBOARD_MENU.map((menu) => {
        const isActive = menu.path === pathname;
        return (
          <Link key={menu.path} href={menu.path}>
            <div
              className={cn(
                'flex cursor-pointer items-center gap-x-4 px-6 py-4',
                isActive && 'bg-primary-blue font-semibold text-white',
              )}
            >
              <menu.icon /> {menu.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
