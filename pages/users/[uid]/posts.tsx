import { getPostsByUser } from '@api/post/find-by-user';
import PostSnippet from '@components/PostSnippet';
import { PostType } from '@response-types/post';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const UserPostsPage = () => {
  const router = useRouter();

  const { uid } = router.query;

  const userPostsQuery = useQuery({
    queryKey: ['user', uid, 'posts'],
    queryFn: () => getPostsByUser(uid as string),
  });

  if (userPostsQuery.isLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen w-full py-4 px-2">
      <h2 className="font-bold text-2xl">
        All posts by {userPostsQuery.data[0].user.username}
      </h2>

      {userPostsQuery.data.map((post: PostType) => {
        return <PostSnippet key={post.id} post={post} />;
      })}
    </main>
  );
};

export default UserPostsPage;
