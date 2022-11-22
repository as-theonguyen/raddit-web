import { CommentType } from '@response-types/comment';

interface Props {
  comment: CommentType;
}

const Comment = ({ comment }: Props) => {
  return (
    <article className="bg-white rounded-md max-w-4xl w-11/12 p-4 border border-gray-200">
      <p className="font-bold">{comment.user.username}</p>
      <p>{comment.content}</p>
    </article>
  );
};

export default Comment;
