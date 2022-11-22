import { me } from '@api/user/me';
import NewPostForm from '@components/NewPostForm';
import PostPreview from '@components/PostPreview';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);

  const togglePreview = () => {
    setPreview((prev) => !prev);
  };

  return (
    <main className="w-full h-screen flex gap-4 justify-center items-center">
      <div className="w-11/12 max-w-4xl bg-white p-8 border border-gray-200 flex flex-col gap-10">
        {preview ? (
          <PostPreview title={title} content={content} />
        ) : (
          <NewPostForm
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
