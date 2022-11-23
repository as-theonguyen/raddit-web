import { register } from '@api/auth/register';
import { me } from '@api/user/me';
import ErrorBox from '@components/ErrorBox';
import FormButton from '@components/FormButton';
import FormInput from '@components/FormInput';
import FormLink from '@components/FormLink';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler } from 'react';

const RegisterPage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: (body: string) => register(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      router.push('/feed');
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const requestBody = JSON.stringify(Object.fromEntries(formData));

    registerMutation.mutate(requestBody);
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-11/12 max-w-md items-center gap-10 bg-white py-10 px-6 rounded-md shadow-md"
      >
        <h2 className="font-bold text-2xl">Create a new account</h2>

        {registerMutation.isError ? (
          // @ts-ignore
          <ErrorBox message={registerMutation.error!.message!} />
        ) : null}

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

        <FormButton loading={registerMutation.isLoading}>
          Create a new account
        </FormButton>

        <FormLink href="/login">Login instead</FormLink>
      </form>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const accessToken = req.cookies.__sess;

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery(['me'], () => me(accessToken));

  if (accessToken && data) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default RegisterPage;
