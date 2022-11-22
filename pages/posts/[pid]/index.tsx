import { getCommentsByPost } from '@api/comment/get-comments-by-post';
import { getOnePost } from '@api/post/get-one-post';
import { me } from '@api/user/me';
import Comment from '@components/Comment';
import NewCommentForm from '@components/NewCommentForm';
import { CommentType } from '@response-types/comment';
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

  const commentsByPostQuery = useQuery({
    queryKey: ['post', pid, 'comments'],
    queryFn: () => getCommentsByPost(pid as string),
    enabled: !!postQuery.data.id,
  });

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
  });

  if (postQuery.isLoading || commentsByPostQuery.isLoading)
    return <div>Loading...</div>;

  return (
    <main className="w-full flex flex-col items-center gap-4 mt-10">
      <section className="bg-white p-4 rounded-md border border-gray-200 w-11/12 max-w-4xl">
        <h1 className="font-bold text-4xl mb-2">{postQuery.data.title}</h1>
        <p className="mb-10">{postQuery.data.user.username}</p>
        <ReactMarkdown className="prose">
          {postQuery.data.content}
        </ReactMarkdown>
      </section>

      {meQuery.data ? <NewCommentForm pid={pid as string} /> : null}

      {commentsByPostQuery.data.map((comment: CommentType) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { pid } = params!;

  const authorization = req.cookies.__sess;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', pid],
    queryFn: () => getOnePost(pid as string),
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

export default PostPage;
