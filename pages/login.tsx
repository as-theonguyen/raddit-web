import FormButton from '@components/FormButton';
import FormInput from '@components/FormInput';
import FormLink from '@components/FormLink';
import { FormEventHandler } from 'react';

const LoginPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-11/12 max-w-md items-center gap-10 bg-white py-10 px-6 rounded-md shadow-md"
      >
        <h2 className="font-bold text-2xl">Login</h2>

        <FormInput
          type="email"
          name="email"
          required
          id="email"
          label="Email"
        />

        <FormInput
          type="password"
          name="password"
          required
          id="password"
          label="Password"
          minLength={8}
        />

        <FormButton>Login</FormButton>

        <FormLink href="/register">Create a new account</FormLink>
      </form>
    </main>
  );
};

export default LoginPage;
