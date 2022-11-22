import { addComment } from '@api/comment/add-comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEventHandler } from 'react';
import FormButton from './FormButton';
import InlineSpinner from './InlineSpinner';

interface Props {
  pid: string;
}

const NewCommentForm = ({ pid }: Props) => {
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: (body: string) => addComment(body, pid),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['post', pid, 'comments'],
        (existingComments: any) => {
          return [data, ...existingComments];
        }
      );
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const requestBody = JSON.stringify(Object.fromEntries(formData));

    addCommentMutation.mutate(requestBody);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-md border border-gray-200 w-11/12 max-w-4xl flex flex-col gap-4"
    >
      <textarea
        name="content"
        required
        className="border border-gray-400 outline-none focus:border-blue-600 p-4 rounded-md resize-none h-48 w-full"
      />
      <FormButton type="submit">
        Add comment {addCommentMutation.isLoading ? <InlineSpinner /> : null}
      </FormButton>
    </form>
  );
};

export default NewCommentForm;
