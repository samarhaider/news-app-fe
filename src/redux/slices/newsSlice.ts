import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getNews } from "@api/news";
interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
}

interface NewsState {
  news: string[];
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

// **Thunk to fetch news**
export const fetchNews = createAsyncThunk("news/fetchNews", async (_, { rejectWithValue }) => {
  try {
    const response = await getNews();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load news");
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
