import { sendRequest } from '@utils/send-request';

export const getAllUsers = async () => {
  const response = await sendRequest({ path: 'users' });
  return response;
};
