import { sendRequest } from '@utils/send-request';

export const getOnePost = async (postId: string) => {
  const response = await sendRequest({ path: `posts/${postId}` });
  return response;
};
