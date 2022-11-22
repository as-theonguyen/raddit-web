import { logout } from '@api/auth/logout';
import { me } from '@api/user/me';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import InlineSpinner from './InlineSpinner';
import NavLink from './NavLink';

const Navbar = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: (all: boolean) => logout(all),
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      router.push('/login');
    },
  });

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
  });

  if (meQuery.isLoading) return <nav>Loading...</nav>;

  return (
    <nav className="bg-white p-6 flex justify-end border-b border-gray-300">
      {meQuery.data ? (
        <div className="flex gap-4">
          <NavLink href="/feed">Feed</NavLink>

          <NavLink href="/posts/new">Create a new post</NavLink>

          <button
            className="hover:underline hover:text-rose-600"
            onClick={() => logoutMutation.mutate(false)}
          >
            Logout {logoutMutation.isLoading ? <InlineSpinner /> : null}
          </button>
        </div>
      ) : (
        <div className="flex gap-6">
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/register">Register</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
