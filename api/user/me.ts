import { sendRequest } from '@utils/send-request';
import { getAuthToken } from '@utils/token';

export const me = async (token?: string) => {
  let authorization;

  if (typeof window === 'undefined') {
    authorization = token;
  } else {
    authorization = token || (await getAuthToken());
  }

  const data = await sendRequest({ path: 'users/me', token: authorization });

  return data;
};
