import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getFollowees } from '@api/user/get-followees';
import { UserType } from '@response-types/user';
import UserSnippet from '@components/UserSnippet';
import { getOneUser } from '@api/user/get-one-user';

const FolloweesPage = () => {
  const router = useRouter();

  const { uid } = router.query;

  const followeesQuery = useQuery({
    queryKey: ['user', uid, 'followees'],
    queryFn: () => getFollowees(uid as string),
  });

  const userQuery = useQuery({
    queryKey: ['user', uid],
    queryFn: () => getOneUser(uid as string),
  });

  if (followeesQuery.isLoading || userQuery.isLoading)
    return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen w-full py-4 px-2">
      <h2 className="font-bold text-2xl">
        {userQuery.data.user.username}&apos;s followees
      </h2>

      {followeesQuery.data.map((u: UserType) => {
        return <UserSnippet key={u.id} user={u} />;
      })}
    </main>
  );
};

export default FolloweesPage;
