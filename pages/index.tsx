import { logout } from '@api/auth/logout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const Homepage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: (all: boolean) => logout(all),
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      router.push('/');
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Raddit</h1>
      <button onClick={() => logoutMutation.mutate(false)}>Logout</button>
    </div>
  );
};

export default Homepage;
