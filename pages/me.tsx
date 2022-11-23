import { me } from '@api/user/me';
import { updateUser } from '@api/user/update-user';
import { getOneUser } from '@api/user/get-one-user';
import FormButton from '@components/FormButton';
import FormInput from '@components/FormInput';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { FormEventHandler } from 'react';
import ProfileLink from '@components/ProfileLink';

const MePage = () => {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
  });

  const userQuery = useQuery({
    queryKey: ['user', meQuery.data.id],
    queryFn: () => getOneUser(meQuery.data.id),
    enabled: !!meQuery.data,
  });

  const updateUserMutation = useMutation({
    mutationFn: (body: string) => updateUser(meQuery.data.id, body),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], (existing: any) => {
        return {
          ...existing,
          email: updatedUser.email,
          username: updatedUser.username,
        };
      });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formDataObject = Object.fromEntries(formData);

    const requestBody = {
      email: formDataObject.email || undefined,
      username: formDataObject.username || undefined,
      password: formDataObject.password || undefined,
      currentPassword: formDataObject.currentPassword,
    };

    updateUserMutation.mutate(JSON.stringify(requestBody));
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="bg-white rounded-md p-4 border border-gray-200 w-11/12 max-w-4xl flex flex-col gap-10">
        <section>
          <h2 className="font-bold text-xl">Your information</h2>
          <p>Email: {meQuery.data.email}</p>
          <p>Username: {meQuery.data.username}</p>

          <ProfileLink href={`/users/${meQuery.data.id}/followers`}>
            Followed by {userQuery.data.followerCount} user(s)
          </ProfileLink>

          <ProfileLink href={`/users/${meQuery.data.id}/followees`}>
            Following {userQuery.data.followeeCount} user(s)
          </ProfileLink>

          <ProfileLink href={`/users/${meQuery.data.id}/posts`}>
            All your posts
          </ProfileLink>
        </section>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Update your information</h2>

          <FormInput type="email" name="email" id="email" label="Email" />

          <FormInput
            type="text"
            name="username"
            id="username"
            label="Username"
          />

          <FormInput
            type="password"
            name="password"
            id="password"
            label="Password"
            minLength={8}
          />

          <FormInput
            type="password"
            name="currentPassword"
            required
            id="current-password"
            label="Current Password"
            minLength={8}
          />

          <FormButton loading={updateUserMutation.isLoading}>Update</FormButton>
        </form>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const authorization = req.cookies.__sess;

  if (!authorization) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: () => me(authorization),
  });

  if (!data) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ['user', data.id],
    queryFn: () => getOneUser(data.id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MePage;
