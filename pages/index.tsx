import { getAllPosts } from '@api/post/get-all-post';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { PostType } from '@response-types/post';
import { GetServerSideProps } from 'next';
import PostSnippet from '@components/PostSnippet';

const Homepage = () => {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
  });

  if (postsQuery.isLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen w-full py-4 px-2">
      {postsQuery.data.map((post: PostType) => {
        return <PostSnippet key={post.id} post={post} />;
      })}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Homepage;
