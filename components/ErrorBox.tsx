interface Props {
  message: string;
}

const ErrorBox = ({ message }: Props) => {
  return (
    <div className="bg-rose-600 w-full p-6 rounded-md text-white text-center">
      <p>{message}</p>
    </div>
  );
};

export default ErrorBox;
