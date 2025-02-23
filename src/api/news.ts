import api from './api';

const apiUrl = '/news'; // Replace with your actual API URL

export const getNews = async () => {
  try {
    const response = await api.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
