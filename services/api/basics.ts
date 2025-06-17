const BASE_URL = 'http://localhost:3000/api';

export const getInfos = async () => {
  const response = await fetch(`${BASE_URL}/infos`);
  return response.json();
};

export const getLastArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles`);
  return response.json();
};
