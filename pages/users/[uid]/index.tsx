import { follow } from '@api/follow/follow';
import { unfollow } from '@api/follow/unfollow';
import { getFollowers } from '@api/user/get-followers';
import { getOneUser } from '@api/user/get-one-user';
import { me } from '@api/user/me';
import FollowButton from '@components/FollowButton';
import ProfileLink from '@components/ProfileLink';
import { UserType } from '@response-types/user';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const PublicUserProfilePage = () => {
  const router = useRouter();

  const { uid } = router.query;

  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['user', uid],
    queryFn: () => getOneUser(uid as string),
  });

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
  });

  const followersQuery = useQuery({
    queryKey: ['user', uid, 'followers'],
    queryFn: () => getFollowers(uid as string),
  });

  const followMutation = useMutation({
    mutationFn: () => {
      const body = JSON.stringify({ followeeId: uid });
      return follow(body);
    },
    onSuccess: () => {
      queryClient.setQueryData(['user', uid, 'followers'], (existing: any) => {
        return [
          ...existing,
          {
            id: meQuery.data.id,
            email: meQuery.data.email,
            username: meQuery.data.username,
          },
        ];
      });

      queryClient.setQueryData(['user', uid], (existing: any) => {
        return {
          ...existing,
          followerCount: existing.followerCount + 1,
        };
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollow(uid as string),
    onSuccess: () => {
      queryClient.setQueryData(['user', uid, 'followers'], (existing: any) => {
        return existing.filter((u: UserType) => u.id !== meQuery.data.id);
      });

      queryClient.setQueryData(['user', uid], (existing: any) => {
        return {
          ...existing,
          followerCount: existing.followerCount - 1,
        };
      });
    },
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="bg-white rounded-md p-4 border border-gray-200 w-11/12 max-w-4xl">
        <h2 className="font-bold text-xl">User information</h2>
        <p>Email: {userQuery.data.user.email}</p>
        <p>Username: {userQuery.data.user.username}</p>

        <ProfileLink href={`/users/${userQuery.data.user.id}/followers`}>
          Followed by {userQuery.data.followerCount} user(s)
        </ProfileLink>

        <ProfileLink href={`/users/${userQuery.data.user.id}/followees`}>
          Following {userQuery.data.followeeCount} user(s)
        </ProfileLink>

        <ProfileLink href={`/users/${userQuery.data.user.id}/posts`}>
          View all posts by this user
        </ProfileLink>

        {meQuery.data ? (
          followersQuery.data.some(
            (u: UserType) => u.id === meQuery.data.id
          ) ? (
            <FollowButton
              onClick={() => unfollowMutation.mutate()}
              loading={unfollowMutation.isLoading}
            >
              Unfollow
            </FollowButton>
          ) : (
            <FollowButton
              onClick={() => followMutation.mutate()}
              loading={followMutation.isLoading}
            >
              Follow
            </FollowButton>
          )
        ) : null}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const authorization = req.cookies.__sess;

  const { uid } = params!;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', uid],
    queryFn: () => getOneUser(uid as string),
  });

  await queryClient.prefetchQuery({
    queryKey: ['user', uid, 'followers'],
    queryFn: () => getFollowers(uid as string),
  });

  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: () => me(authorization),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PublicUserProfilePage;
