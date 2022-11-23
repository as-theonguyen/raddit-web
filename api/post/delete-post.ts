import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const deletePost = async (pid: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: `posts/${pid}`,
    method: 'DELETE',
    token,
  });
  return response;
};
