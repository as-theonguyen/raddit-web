import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const deleteComment = async (cid: string) => {
  const token = await getAuthToken();
  const response = await sendRequest({
    path: `comments/${cid}`,
    method: 'DELETE',
    token,
  });
  return response;
};
