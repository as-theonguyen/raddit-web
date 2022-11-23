import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const updatePost = async (pid: string, body: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: `posts/${pid}`,
    method: 'PATCH',
    body,
    token,
  });
  return response;
};
