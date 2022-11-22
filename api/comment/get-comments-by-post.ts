import { sendRequest } from '@utils/send-request';

export const getCommentsByPost = async (pid: string) => {
  const response = await sendRequest({ path: `posts/${pid}/comments` });
  return response;
};
