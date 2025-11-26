import { BookText, House, UserRound } from 'lucide-react';

export const FOOTER_MENU = {
  services: [
    { label: 'BANTUAN', url: '#' },
    { label: 'TANYA JAWAB', url: '#' },
    { label: 'HUBUNGI KAMI', url: '#' },
    { label: 'CARA BERJUALAN', url: '#' },
  ],
  about: [
    { label: 'ABOUT US', url: '#' },
    { label: 'KARIR', url: '#' },
    { label: 'BLOG', url: '#' },
    { label: 'KEBIJAKAN PRIVASI', url: '#' },
    { label: 'SYARAT DAN KETENTUAN', url: '#' },
  ],
  partner: [{ label: 'MITRA', url: '#' }],
};

export const DASHBOARD_MENU = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: House,
  },
  {
    label: 'Manajemen User',
    path: '/dashboard/user',
    icon: UserRound,
  },
  {
    label: 'Manajemen Produk',
    path: '/dashboard/product',
    icon: BookText,
  },
];
