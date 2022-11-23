import { addNewPost } from '@api/post/add-new-post';
import { me } from '@api/user/me';
import PostForm from '@components/PostForm';
import PostPreview from '@components/PostPreview';
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

const initialContent = `
  ## H2 heading
  ### H3 heading
  normal text

  - list item 1
  - list item 2

  \`\`\`
  npm install
  \`\`\`

  Read more about Markdown [here](https://www.markdownguide.org/getting-started/)
`;

const NewPostPage = () => {
  const [title, setTitle] = useState('Sample title');
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState(false);

  const router = useRouter();

  const addNewPostMutation = useMutation({
    mutationFn: (body: string) => addNewPost(body),
    onSuccess: (data) => {
      router.push(`/posts/${data.id}`);
    },
  });

  const togglePreview = () => {
    setPreview((prev) => !prev);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const requestBody = JSON.stringify({ title, content });

    addNewPostMutation.mutate(requestBody);
  };

  return (
    <main className="w-full h-screen flex gap-4 justify-center items-center">
      <div className="w-11/12 max-w-4xl bg-white p-8 border border-gray-200 flex flex-col gap-10">
        {preview ? (
          <PostPreview title={title} content={content} />
        ) : (
          <PostForm
            handleSubmit={handleSubmit}
            isSubmitting={addNewPostMutation.isLoading}
            buttonText="Publish"
            formTitle="Create a new post"
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

export default NewPostPage;
