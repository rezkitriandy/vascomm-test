'use client';

import { StatusBadge } from '@/components';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { formatCurrencyIDR } from '@/lib/utils';
import { IProduct } from '@/types/global';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductModal from './ProductModal';

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);

  const columns: ColumnDef<IProduct>[] = [
    {
      // accessorKey: 'id',
      header: 'No',
      enableSorting: false,
      cell: ({ row, table }) => {
        return (
          (table.getSortedRowModel()?.rows?.findIndex((r) => r.id === row.id) ||
            0) + 1
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Produk',
      enableSorting: true,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-x-4">
            <div className="relative size-8 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center"
              />
            </div>
            {product.name}
          </div>
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Harga',
      enableSorting: true,
      cell: ({ row }) => {
        const price = row.getValue('price') as number;
        return formatCurrencyIDR(price);
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Tanggal Dibuat',
      enableSorting: true,
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt') as string;
        return dayjs(createdAt).format('DD MMMM YYYY');
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean;
        return <StatusBadge isActive={isActive} />;
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-x-2">
            <Button className="!size-6 rounded-full !bg-[#479F77] !p-0 [&_svg]:!size-3">
              <Eye />
            </Button>
            <Button
              className="!size-6 rounded-full !bg-[#EC9024] !p-0 [&_svg]:!size-3"
              onClick={() => {
                setSelectedProduct(user);
                setOpenProductModal(true);
              }}
            >
              <SquarePen />
            </Button>
            <Button
              className="!size-6 rounded-full !bg-[#D83A56] !p-0 [&_svg]:!size-3"
              onClick={() => {
                setSelectedProduct(user);
                setOpenConfirmDeleteModal(true);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/product');
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const products: IProduct[] = await res.json();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!openProductModal) {
      setSelectedProduct(undefined);
    }
  }, [openProductModal]);

  useEffect(() => {
    if (!openConfirmDeleteModal) {
      setSelectedProduct(undefined);
    }
  }, [openConfirmDeleteModal]);

  const handleDelete = () => {
    const newProducts = products.filter(
      (product) => product.id !== selectedProduct?.id,
    );
    setProducts(newProducts);
    setOpenConfirmDeleteModal(false);
    setSelectedProduct(undefined);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg">Manajemen Produk</h3>
          <Button onClick={() => setOpenProductModal(true)}>
            TAMBAH PRODUK
          </Button>
        </div>
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                        <div>
                          {header.column.getCanSort()
                            ? ({
                                asc: '▲',
                                desc: '▼',
                              }[header.column.getIsSorted() as string] ?? '')
                            : null}
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="odd:bg-transparent even:bg-white"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <ProductModal
        open={openProductModal}
        setOpen={setOpenProductModal}
        setProducts={setProducts}
        selectedProduct={selectedProduct}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        name={selectedProduct?.name ?? ''}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ProductList;
