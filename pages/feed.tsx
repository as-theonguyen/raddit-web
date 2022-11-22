import { feed } from '@api/user/feed';
import { me } from '@api/user/me';
import PostSnippet from '@components/PostSnippet';
import { PostType } from '@response-types/post';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

const FeedPage = () => {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
  });

  const feedQuery = useQuery({
    queryKey: ['feed'],
    queryFn: () => feed(meQuery.data.id),
    enabled: !!meQuery.data.id,
  });

  if (feedQuery.isLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen w-full py-4 px-2">
      {feedQuery.data.map((post: PostType) => {
        return <PostSnippet key={post.id} post={post} />;
      })}
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default FeedPage;
