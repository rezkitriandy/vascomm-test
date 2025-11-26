import dayjs from 'dayjs';

export const dummyUsers = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin',
    isAdmin: true,
  },
  {
    email: 'user@example.com',
    password: 'user123',
    name: 'User',
    isAdmin: false,
  },
];

export const users = [
  {
    id: '1',
    name: 'Aden S. Putra',
    email: 'aden@gmail.com',
    phone: '081287823283',
    isActive: true,
  },
  {
    id: '2',
    name: 'Bagus Ahmad Maulana',
    email: 'bagus@gmail.com',
    phone: '081287823283',
    isActive: false,
  },
  {
    id: '3',
    name: 'Zaki Bima',
    email: 'zaki@gmail.com',
    phone: '081287823283',
    isActive: true,
  },
];

export const products = [
  {
    id: '1',
    image: '/surface7.png',
    name: 'Microsoft Surface 7',
    createdAt: dayjs(),
    price: 2500000,
    isActive: true,
  },
  {
    id: '2',
    image: '/surface7.png',
    name: 'Microsoft Surface 7 Pro',
    createdAt: dayjs().add(3, 'd'),
    price: 3000000,
    isActive: false,
  },
  {
    id: '3',
    image: '/surface7.png',
    name: 'Microsoft Surface 7 Max',
    createdAt: dayjs().add(2, 'd'),
    price: 4000000,
    isActive: true,
  },
  {
    id: '4',
    image: '/surface7.png',
    name: 'Microsoft Surface 7 Lite',
    createdAt: dayjs().add(3, 'd'),
    price: 5500000,
    isActive: true,
  },
];
