import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const ForbiddenPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <Button asChild className="mt-8">
        <Link href="/">KEMBALI</Link>
      </Button>
    </div>
  );
};

export default ForbiddenPage;
