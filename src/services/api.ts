const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const login = async ({ identifier, password }: { identifier: string, password: string }) => {
  const data = await fetch(`${baseUrl}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    })
  });
  return data.json();
}

export const fetchDevices = async (jwt: string) => {
  const result = await fetch(`${baseUrl}/devices`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return result.json();
};

export const fetchDevice = async (jwt: string, deviceSN: string) => {
  const result = await fetch(`${baseUrl}/devices/${deviceSN}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return result.json();
};

export const fetchComments = async (jwt: string, deviceId: number) => {
  const data = await fetch(`${baseUrl}/comments?filters[device][id]=${deviceId}`, {
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  });
  return data.json();
};

export const postComment = async (jwt: string, { title, body, deviceId }: { title: string, body: string, deviceId: number }) => {
  const data = await fetch(`${baseUrl}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      data: {
        title,
        body,
        device: {
          connect: [ deviceId ],
        }
      },
    })
  });
  return data.json();
};
