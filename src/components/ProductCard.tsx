import Image from 'next/image';

const ProductCard = () => {
  return (
    <div className="box-border cursor-pointer space-y-3 p-4 pb-8 hover:border hover:border-[#D6D6D6] hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src="/product-thumb.png"
          alt="product"
          fill
          className="object-contain object-center"
        />
      </div>
      <div>
        <h3 className="text-primary-black text-sm font-bold">Euodia</h3>
        <h3 className="text-primary-blue text-sm font-bold">IDR x.xxx.980</h3>
      </div>
    </div>
  );
};

export default ProductCard;
