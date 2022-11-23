import { deleteComment } from '@api/comment/delete-comment';
import { CommentType } from '@response-types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  comment: CommentType;
  currentUserId: string;
  postId: string;
}

const Comment = ({ comment, currentUserId, postId }: Props) => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onSuccess: () => {
      queryClient.setQueryData(
        ['post', postId, 'comments'],
        (existingComments: any) => {
          return existingComments.filter(
            (c: CommentType) => c.id !== comment.id
          );
        }
      );
    },
  });

  return (
    <article className="bg-white rounded-md max-w-4xl w-11/12 p-4 border border-gray-200 flex justify-between">
      <div>
        <p className="font-bold">{comment.user.username}</p>
        <p>{comment.content}</p>
      </div>

      {currentUserId === comment.user.id ? (
        <button
          onClick={() => deleteCommentMutation.mutate()}
          className="hover:text-rose-600 hover:underline text-sm"
        >
          {deleteCommentMutation.isLoading ? 'Deleting...' : 'Delete'}
        </button>
      ) : null}
    </article>
  );
};

export default Comment;
