interface Options {
  body?: string;
  method?: string;
  token?: string;
  path: string;
}

export const sendRequest = async ({ path, body, method, token }: Options) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${path}`,
    {
      // @ts-ignore
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body,
      method,
    }
  );

  const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.message);
  }

  return jsonData.data;
};
