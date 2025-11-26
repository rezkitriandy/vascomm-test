import LoginForm from '@/components/features/auth/login/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-y-8 bg-[url('/login-bg.png')] bg-cover bg-center bg-no-repeat p-32">
        <Link href="/">
          <div className="relative mb-12 h-7 w-[168px] overflow-hidden">
            <Image
              src="/vascomm-logo.png"
              alt="vascomm"
              fill
              className="object-contain object-center"
            />
          </div>
        </Link>
        <h1 className="text-5xl font-semibold">NAMA APLIKASI</h1>
        <p className="text-text-primary-black text-center text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="flex items-center justify-center p-32">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
