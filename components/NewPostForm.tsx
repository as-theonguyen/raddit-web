import { addNewPost } from '@api/post/add-new-post';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import FormButton from './FormButton';

interface Props {
  title: string;
  content: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
}

const NewPostForm = ({ title, content, setTitle, setContent }: Props) => {
  const router = useRouter();

  const addNewPostMutation = useMutation({
    mutationFn: (body: string) => addNewPost(body),
    onSuccess: (data) => {
      router.push(`/posts/${data.id}`);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const requestBody = JSON.stringify({ title, content });

    addNewPostMutation.mutate(requestBody);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 items-center w-full"
    >
      <h2 className="font-bold text-2xl">Create a new post</h2>

      <div className="flex gap-2 flex-col w-full">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Post title"
          className="border border-gray-400 outline-none focus:border-blue-600 px-4 py-2 rounded-md"
        />
      </div>

      <div className="flex gap-2 flex-col w-full">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Enter the content of the post here using markdown"
          className="border border-gray-400 outline-none focus:border-blue-600 p-4 font-mono rounded-md resize-none h-96"
        />
      </div>

      <FormButton loading={addNewPostMutation.isLoading}>Publish</FormButton>
    </form>
  );
};

export default NewPostForm;
