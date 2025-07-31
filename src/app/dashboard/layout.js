import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-full">
        <Navbar />
        <main className="p-3 md:p-[32px] mt-[100px] ml-[100px] lg:ml-64">{children}</main>
      </div>
    </div>
  );
}
