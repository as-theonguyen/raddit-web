import { getOnePost } from '@api/post/get-one-post';
import { updatePost } from '@api/post/update-post';
import { me } from '@api/user/me';
import PostForm from '@components/PostForm';
import PostPreview from '@components/PostPreview';
import { PostType } from '@response-types/post';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

interface Props {
  post: PostType;
}

const EditPostPage = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [preview, setPreview] = useState(false);

  const router = useRouter();

  const { pid } = router.query;

  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['post', pid],
    queryFn: () => getOnePost(pid as string),
  });

  const updatePostMutation = useMutation({
    mutationFn: (body: string) => updatePost(pid as string, body),
    onSuccess: () => {
      queryClient.invalidateQueries(['post', pid]);
      router.push(`/posts/${pid}`);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const requsetBody = JSON.stringify({ title, content });
    updatePostMutation.mutate(requsetBody);
  };

  const togglePreview = () => {
    setPreview((prev) => !prev);
  };

  if (postQuery.isLoading) return <div>Loading...</div>;

  return (
    <main className="w-full min-h-screen flex gap-4 justify-center items-center">
      <div className="w-11/12 max-w-4xl bg-white p-8 border border-gray-200 my-10 rounded-md flex flex-col gap-10">
        {preview ? (
          <PostPreview title={title} content={content} />
        ) : (
          <PostForm
            handleSubmit={handleSubmit}
            isSubmitting={updatePostMutation.isLoading}
            buttonText="Update"
            formTitle="Edit post"
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
          />
        )}

        <button
          className="bg-gray-700 hover:bg-gray-800 ease-in duration-100 p-2 w-full rounded-md text-gray-50"
          onClick={togglePreview}
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { pid } = params!;

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

  const meQueryResult = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: () => me(authorization),
  });

  if (!meQueryResult) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const postQueryResult = await queryClient.fetchQuery({
    queryKey: ['post', pid],
    queryFn: () => getOnePost(pid as string),
  });

  if (postQueryResult.user.id !== meQueryResult.id) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      post: postQueryResult,
    },
  };
};

export default EditPostPage;
