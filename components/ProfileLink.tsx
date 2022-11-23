import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

const ProfileLink = ({ href, children }: Props) => {
  return (
    <Link href={href} className="block text-blue-600 hover:underline">
      {children}
    </Link>
  );
};

export default ProfileLink;
