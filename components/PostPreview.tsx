import { PostType } from '@response-types/post';
import { useRouter } from 'next/router';

interface Props {
  post: PostType;
}

const PostPreview = ({ post }: Props) => {
  const router = useRouter();

  return (
    <article className="bg-white border border-gray-300 p-4 rounded-md w-11/12 max-w-2xl">
      <h3
        className="font-bold text-xl cursor-pointer hover:text-blue-600 hover:underline"
        onClick={() => router.push(`/posts/${post.id}`)}
      >
        {post.title}
      </h3>
      <p>{post.user.username}</p>
    </article>
  );
};

export default PostPreview;
