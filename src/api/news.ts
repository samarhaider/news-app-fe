import api from './api';
import { NewsArticle } from "@redux/slices/newsSlice"

const apiUrl = '/news'; // Replace with your actual API URL

// search: string, categories: string, providers: string

export interface NewsApiRequest {
  search?: string;
  categories?: string[];
  providers?: string[];
  page?: number;
}

export interface NewsApiResponse {
  current_page: number;
  data: NewsArticle[];
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  total: number;
}

export const getNews = async (filters: NewsApiRequest) => {
  try {
    const response = await api.get<NewsApiResponse>(apiUrl, {
      params: {...filters}
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
