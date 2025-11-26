import { Navbar, Sidebar } from '@/components/features/dashboard';

interface IProps {
  children: React.ReactNode;
}

const DashboardPageLayout = ({ children }: IProps) => {
  return (
    <div className="flex h-screen flex-col bg-[#F8F8F8]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardPageLayout;
