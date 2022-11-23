import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import FormButton from './FormButton';

interface Props {
  formTitle: string;
  buttonText: string;
  title: string;
  content: string;
  isSubmitting?: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

const PostForm = ({
  title,
  content,
  formTitle,
  setTitle,
  setContent,
  buttonText,
  handleSubmit,
  isSubmitting,
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 items-center w-full"
    >
      <h2 className="font-bold text-2xl">{formTitle}</h2>

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

      <FormButton loading={isSubmitting}>{buttonText}</FormButton>
    </form>
  );
};

export default PostForm;
