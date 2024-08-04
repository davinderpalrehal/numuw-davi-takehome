const BASE_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends RequestInit {
  header: Record<string, string>;
}

const Api = {
  get: async (endpoint: string, requireAuth = false): Promise<any> => {
    const url = `${BASE_URL}/${endpoint}`;
    const requestOptions = getRequestOptions(requireAuth, 'GET');
    const response = await fetch(url, requestOptions);
    return await response.json();
  },
  post: async (
    endpoint: string,
    data: any,
    requireAuth = false,
  ): Promise<any> => {
    const url = `${BASE_URL}/${endpoint}`;
    const requestOptions = getRequestOptions(requireAuth, 'POST', data);
    const response = await fetch(url, requestOptions);
    return await response.json();
  },
};

function getRequestOptions(
  authRequired: boolean,
  method = 'GET',
  body?: any,
): RequestOptions {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');

  if (authRequired) {
    if (!token) throw new Error('User is not logged in');
    headers['Authorization'] = `Bearer ${token}`;
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };
}

export default Api;
