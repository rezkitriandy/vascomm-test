'use client';

import { formatCurrencyIDR } from '@/lib/utils';
import { IProduct, IUser } from '@/types/global';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Summary = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const activeUsers = users.filter((user) => user.isActive);
  const activeProducts = products.filter((product) => product.isActive);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsers, resProducts] = await Promise.all([
          fetch('/api/user'),
          fetch('/api/product'),
        ]);

        if (!resUsers.ok || !resProducts.ok) {
          throw new Error('Failed to fetch');
        }
        const users: IUser[] = await resUsers.json();
        const products: IProduct[] = await resProducts.json();
        const sortedProducts = products.sort((a, b) =>
          dayjs(b.createdAt).diff(dayjs(a.createdAt)),
        );

        setUsers(users);
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h3 className="text-lg">Dashboard</h3>
      <div className="grid grid-cols-4 gap-x-4">
        <SummaryItem
          title="Jumlah User"
          value={String(users.length)}
          valueLabel="User"
        />
        <SummaryItem
          title="Jumlah User Aktif"
          value={String(activeUsers.length)}
          valueLabel="User"
        />
        <SummaryItem
          title="Jumlah Produk"
          value={String(products.length)}
          valueLabel="Produk"
        />
        <SummaryItem
          title="Jumlah Produk Aktif"
          value={String(activeProducts.length)}
          valueLabel="Produk"
        />
      </div>
      {products.length > 0 && (
        <div className="w-[784px] rounded-xl bg-white p-6">
          <h3 className="text-base font-medium text-[#3A3C58]">
            Produk Terbaru
          </h3>
          <div className="mt-4">
            <div className="grid grid-cols-4 items-center">
              <div className="col-span-2 rounded-l-xl bg-primary-blue p-3 text-sm text-white">
                Produk
              </div>
              <div className="bg-primary-blue p-3 text-sm text-white">
                Tanggal Dibuat
              </div>
              <div className="rounded-r-xl bg-primary-blue p-3 text-sm text-white">
                Harga (Rp)
              </div>
              {products.slice(0, 10).map((product) => (
                <>
                  <div className="col-span-2 flex items-center gap-x-2 p-3 text-sm text-[#454C75]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                    />
                    <h3>{product.name}</h3>
                  </div>
                  <div className="p-3 text-sm text-[#A3A6AC]">
                    {dayjs(product.createdAt).format('DD MMM YYYY')}
                  </div>
                  <div className="rounded-r-xl p-3 text-sm">
                    {formatCurrencyIDR(product.price)}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryItem = ({
  title,
  value,
  valueLabel,
}: {
  title: string;
  value: string;
  valueLabel: string;
}) => {
  return (
    <div className="relative space-y-2 overflow-hidden rounded-2xl bg-gradient-to-l from-[#C2D6FF] to-[#ADC9FF] px-6 py-6">
      <div className="text-sm text-[#597393]">{title}</div>
      <div className="text-2xl text-[#002060]">
        {value} <span className="text-base">{valueLabel}</span>
      </div>
      <div className="absolute -bottom-3 -right-3 size-16 rounded-full bg-white/25" />
      <div className="absolute -right-6 bottom-4 size-16 rounded-full bg-white/25" />
    </div>
  );
};

export default Summary;
