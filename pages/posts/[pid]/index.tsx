import { getOnePost } from '@api/post/get-one-post';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

const PostPage = () => {
  const router = useRouter();

  const { pid } = router.query;

  const postQuery = useQuery({
    queryKey: ['post', pid],
    queryFn: () => getOnePost(pid as string),
  });

  if (postQuery.isLoading) return <div>Loading...</div>;

  return (
    <main className="w-11/12 max-w-4xl mx-auto mt-10 bg-white p-4 border border-gray-200 rounded-md">
      <h1 className="font-bold text-2xl">{postQuery.data.title}</h1>
      <p>{postQuery.data.user.username}</p>
      <ReactMarkdown>{postQuery.data.content}</ReactMarkdown>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { pid } = params!;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', pid],
    queryFn: () => getOnePost(pid as string),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PostPage;
