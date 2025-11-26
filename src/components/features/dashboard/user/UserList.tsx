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
import { IUser } from '@/types/global';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserModal from './UserModal';

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'id',
      header: 'No',
      enableSorting: false,
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      accessorKey: 'name',
      header: 'Nama Lengkap',
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      enableSorting: true,
    },
    {
      accessorKey: 'phone',
      header: 'No. Telepon',
      enableSorting: true,
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
                setSelectedUser(user);
                setOpenUserModal(true);
              }}
            >
              <SquarePen />
            </Button>
            <Button
              className="!size-6 rounded-full !bg-[#D83A56] !p-0 [&_svg]:!size-3"
              onClick={() => {
                setSelectedUser(user);
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
    data: users,
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
        const res = await fetch('/api/user');
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const users: IUser[] = await res.json();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!openUserModal) {
      setSelectedUser(undefined);
    }
  }, [openUserModal]);

  useEffect(() => {
    if (!openConfirmDeleteModal) {
      setSelectedUser(undefined);
    }
  }, [openConfirmDeleteModal]);

  const handleDelete = () => {
    const newUsers = users.filter((user) => user.id !== selectedUser?.id);
    setUsers(newUsers);
    setOpenConfirmDeleteModal(false);
    setSelectedUser(undefined);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg">Manajemen User</h3>
          <Button onClick={() => setOpenUserModal(true)}>TAMBAH USER</Button>
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
      <UserModal
        open={openUserModal}
        setOpen={setOpenUserModal}
        setUsers={setUsers}
        selectedUser={selectedUser}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        name={selectedUser?.name ?? ''}
        onDelete={handleDelete}
      />
    </>
  );
};

export default UserList;
