import { ProductCard } from '@/components';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';

const LatestProducts = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-primary-black text-2xl font-bold">Terbaru</h1>
      <div>
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={`latestproduct-${index}`}
                className="basis-1/5"
              >
                <ProductCard />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="[&_svg]:!size-8" />
          <CarouselNext className="[&_svg]:!size-8" />
        </Carousel>
      </div>
    </div>
  );
};

export default LatestProducts;
