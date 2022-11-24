import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import InlineSpinner from './InlineSpinner';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  loading?: boolean;
}

const FormButton = ({ children, loading, ...rest }: Props) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 ease-in duration-100 p-2 w-full rounded-md text-gray-50 disabled:cursor-not-allowed disabled:bg-blue-400"
      type="submit"
      disabled={loading}
      {...rest}
    >
      {children} {loading ? <InlineSpinner /> : null}
    </button>
  );
};

export default FormButton;
