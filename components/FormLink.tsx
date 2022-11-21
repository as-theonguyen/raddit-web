import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

const FormLink = ({ href, children }: Props) => {
  return (
    <Link
      href={href}
      className="text-blue-600 hover:underline ease-in duration-100"
    >
      {children}
    </Link>
  );
};

export default FormLink;
