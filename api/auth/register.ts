export const register = async (body: string) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body,
  });

  const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.error);
  }

  return jsonData.data;
};
