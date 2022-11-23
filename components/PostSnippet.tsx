import { deletePost } from '@api/post/delete-post';
import { me } from '@api/user/me';
import { PostType } from '@response-types/post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  post: PostType;
}

const PostSnippet = ({ post }: Props) => {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
  });

  const router = useRouter();

  const isLoggedIn = !meQuery.isLoading && meQuery.data;

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.setQueryData(['posts'], (existingPosts: any) => {
        return existingPosts.filter((p: PostType) => p.id !== post.id);
      });
    },
  });

  return (
    <article className="bg-white border border-gray-300 p-4 rounded-md w-11/12 max-w-2xl flex justify-between">
      <div>
        <h3
          className="font-bold text-xl cursor-pointer hover:text-blue-600 hover:underline"
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          {post.title}
        </h3>
        <Link
          href={`/users/${post.user.id}`}
          className="hover:underline hover:text-blue-600"
        >
          {post.user.username}
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        {isLoggedIn && meQuery.data.id === post.user.id ? (
          <>
            <Link
              className="hover:text-blue-600 hover:underline text-sm"
              href={`/posts/${post.id}/edit`}
            >
              Edit
            </Link>

            <button
              onClick={() => deletePostMutation.mutate()}
              className="hover:text-rose-600 hover:underline text-sm"
            >
              {deletePostMutation.isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </>
        ) : null}
      </div>
    </article>
  );
};

export default PostSnippet;
