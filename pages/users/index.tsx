import { getAllUsers } from '@api/user/get-all-users';
import UserSnippet from '@components/UserSnippet';
import { UserType } from '@response-types/user';
import { useQuery } from '@tanstack/react-query';

const AllUsersPage = () => {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
  });

  if (usersQuery.isLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen w-full py-4 px-2">
      <h2 className="font-bold text-2xl">All users</h2>

      {usersQuery.data.map((u: UserType) => {
        return <UserSnippet key={u.id} user={u} />;
      })}
    </main>
  );
};

export default AllUsersPage;
