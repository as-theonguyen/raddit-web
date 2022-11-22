import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const addComment = async (body: string, pid: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: `posts/${pid}/comments`,
    body,
    token,
    method: 'POST',
  });
  return response;
};
