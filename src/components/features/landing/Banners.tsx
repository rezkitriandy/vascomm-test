import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';
import Image from 'next/image';

const Banners = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="relative h-[330px] w-full">
              <Image
                src="/landing-banner.png"
                alt="banner"
                fill
                className="object-fill object-center"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative h-[330px] w-full">
              <Image
                src="/landing-banner.png"
                alt="banner"
                fill
                className="object-fill object-center"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative h-[330px] w-full">
              <Image
                src="/landing-banner.png"
                alt="banner"
                fill
                className="object-fill object-center"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="mt-4 flex items-center gap-x-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselDots />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banners;
