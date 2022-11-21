import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

const FormButton = ({ children, ...rest }: Props) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 ease-in duration-100 p-2 w-full rounded-md text-gray-50"
      type="submit"
      {...rest}
    >
      {children}
    </button>
  );
};

export default FormButton;
