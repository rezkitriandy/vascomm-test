import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { IUser } from '@/types/global';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (v: boolean) => void;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  selectedUser: IUser | undefined;
}

interface IFormValues {
  name: string;
  phone: string;
  email: string;
}

const UserModal = ({ open, setOpen, setUsers, selectedUser }: IProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();

  useEffect(() => {
    if (open && selectedUser) {
      const { name, phone, email } = selectedUser;
      setValue('name', name);
      setValue('phone', phone);
      setValue('email', email);
    }
  }, [open, selectedUser, setValue]);

  const handleSave = (values: IFormValues) => {
    if (selectedUser) {
      const { id } = selectedUser;
      setUsers((prev) => {
        const newUsers = prev.map((user) =>
          user.id === id ? { ...user, ...values } : user,
        );
        return newUsers;
      });
    } else {
      const newUser: IUser = {
        id: uuidv4(),
        isActive: true,
        ...values,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!selectedUser ? 'Tambah' : 'Ubah Data'} User
          </DialogTitle>
        </DialogHeader>
        <form className="mt-8" onSubmit={handleSubmit(handleSave)}>
          <div className="space-y-4">
            <Input
              label="Nama"
              placeholder="Masukkan nama"
              error={errors.name?.message}
              {...register('name', { required: 'Nama harus diisi' })}
            />
            <Input
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              error={errors.phone?.message}
              {...register('phone', { required: 'Nomor telepon harus diisi' })}
            />
            <Input
              label="Email"
              placeholder="Masukkan email"
              error={errors.email?.message}
              {...register('email', { required: 'Email harus diisi' })}
            />
          </div>
          <Button className="mt-8 w-full" type="submit">
            SIMPAN
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
