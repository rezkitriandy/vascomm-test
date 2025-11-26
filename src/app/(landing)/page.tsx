import {
  AvailableProducts,
  Banners,
  LatestProducts,
} from '@/components/features/landing';

const LandingPage = () => {
  return (
    <div className="space-y-8">
      <Banners />
      <LatestProducts />
      <AvailableProducts />
    </div>
  );
};

export default LandingPage;
