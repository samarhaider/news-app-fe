import api from './api';

const apiUrl = '/preferences'; // Replace with your actual API URL

// Fetch preferences (providers, authors, categories)
export const getPreferences = async () => {
  try {
    const response = await api.get(apiUrl);
    return response.data; // Example response: { newsProviders, authors, categories }
  } catch (error) {
    console.error("Error fetching preferences:", error);
    throw error;
  }
};

// Save user preferences (providers, authors, categories)
export const savePreferences = async (data: { providers: string[]; categories: string[] }) => {
  try {
    await api.put(apiUrl, data);
  } catch (error) {
    console.error("Error saving preferences:", error);
    throw error;
  }
};
