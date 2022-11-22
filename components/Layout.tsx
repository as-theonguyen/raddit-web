import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-gray-100 w-screen min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
