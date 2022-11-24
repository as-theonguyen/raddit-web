import { feed } from '@api/user/feed';
import { me } from '@api/user/me';
import PostSnippet from '@components/PostSnippet';
import { PostType } from '@response-types/post';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const FeedPage = () => {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
  });

  const feedQuery = useQuery({
    queryKey: ['feed'],
    queryFn: () => feed(meQuery.data.id),
    enabled: !!meQuery.data?.id,
  });

  if (feedQuery.isLoading) return <div>Loading...</div>;

  const emptyFeed = feedQuery.data.length === 0;

  return (
    <main className="flex flex-col items-center gap-4 min-h-screen w-full py-4 px-2">
      {!emptyFeed ? (
        feedQuery.data.map((post: PostType) => {
          return <PostSnippet key={post.id} post={post} />;
        })
      ) : (
        <p>
          Your feed is empty, start{' '}
          <Link href="/users" className="text-blue-600 hover:underline">
            following people
          </Link>{' '}
          or go to{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            all posts page
          </Link>
        </p>
      )}
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
