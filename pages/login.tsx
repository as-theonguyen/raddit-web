import { login } from '@api/auth/login';
import { me } from '@api/user/me';
import FormButton from '@components/FormButton';
import FormInput from '@components/FormInput';
import FormLink from '@components/FormLink';
import InlineSpinner from '@components/InlineSpinner';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler } from 'react';

const LoginPage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (body: string) => login(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      router.push('/feed');
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const requestBody = JSON.stringify(Object.fromEntries(formData));

    loginMutation.mutate(requestBody);
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

        <FormButton loading={loginMutation.isLoading}>Login</FormButton>

        <FormLink href="/register">Create a new account</FormLink>
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

export default LoginPage;
