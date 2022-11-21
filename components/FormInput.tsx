import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

const FormInput = ({ label, id, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        className="border border-gray-400 py-2 px-4 rounded-md outline-none focus:border-blue-600"
        id={id}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
