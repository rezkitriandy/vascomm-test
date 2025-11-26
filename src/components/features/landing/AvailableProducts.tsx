import { ProductCard } from '@/components';
import { Button } from '@/components/ui/Button';

const AvailableProducts = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-primary-black text-2xl font-bold">Produk Tersedia</h1>
      <div className="grid grid-cols-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCard key={`availproduct-${index}`} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline">Lihat lebih banyak</Button>
      </div>
    </div>
  );
};

export default AvailableProducts;
