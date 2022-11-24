import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import InlineSpinner from './InlineSpinner';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

const FollowButton = ({ onClick, children, loading }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white py-2 px-6 rounded-md mt-4 disabled:cursor-not-allowed disabled:bg-blue-400"
      disabled={loading}
    >
      {children} {loading ? <InlineSpinner /> : null}
    </button>
  );
};

export default FollowButton;
