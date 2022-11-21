interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="bg-gray-100">{children}</div>;
};

export default Layout;
