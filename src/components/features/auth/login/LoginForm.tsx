'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IUserAuth } from '@/types/global';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormValues {
  email: string;
  password: string;
}

interface IApiResponse {
  user: IUserAuth;
  status: boolean;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async (values: IFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data: IApiResponse = await res.json();

      if (res.ok) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        if (data.user.isAdmin) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="w-[382px] space-y-8">
        <div className="space-y-2">
          <h3 className="text-text-primary-black text-2xl">Selamat Datang</h3>
          <p className="text-text-secondary text-xs">
            Silahkan masukkan email atau nomor telepon dan password Anda untuk
            mulai menggunakan aplikasi
          </p>
        </div>
        <div className="space-y-4">
          <Input
            label="Email/Nomor Telpon"
            placeholder="Contoh: admin@gmail.com"
            error={errors.email?.message}
            {...register('email', { required: 'Email harus diisi' })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Masukkan passward"
            error={errors.password?.message}
            {...register('password', { required: 'Password harus diisi' })}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          MASUK
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
