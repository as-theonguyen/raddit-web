interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="bg-gray-100 w-screen min-h-screen">{children}</div>;
};

export default Layout;
