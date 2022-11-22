import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: Props) => {
  return (
    <Link
      href={href}
      className="text-gray-900 hover:underline hover:text-blue-600"
    >
      {children}
    </Link>
  );
};

export default NavLink;
