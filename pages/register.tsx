import FormButton from '@components/FormButton';
import FormInput from '@components/FormInput';
import FormLink from '@components/FormLink';
import { FormEventHandler } from 'react';

const RegisterPage = () => {
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
        <h2 className="font-bold text-2xl">Create a new account</h2>

        <FormInput
          type="email"
          name="email"
          required
          id="email"
          label="Email"
        />

        <FormInput
          type="text"
          name="username"
          required
          id="username"
          label="Username"
        />

        <FormInput
          type="password"
          name="password"
          required
          id="password"
          label="Password"
          minLength={8}
        />

        <FormButton>Create a new account</FormButton>

        <FormLink href="/login">Login instead</FormLink>
      </form>
    </main>
  );
};

export default RegisterPage;
