import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPreferences, savePreferences } from "@api/preferences";

interface PreferencesState {
  providers: string[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: PreferencesState = {
  providers: [],
  categories: [],
  loading: false,
  error: null,
};

// **Thunk to fetch preferences**
export const fetchPreferences = createAsyncThunk("preferences/fetchPreferences", async (_, { rejectWithValue }) => {
  try {
    const response = await getPreferences();
    return response.data.preferences; // Ensure correct data structure
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load preferences");
  }
});

// **Thunk to save preferences**
export const updatePreferences = createAsyncThunk(
  "preferences/updatePreferences",
  async (preferences: { providers: string[]; categories: string[] }, { rejectWithValue }) => {
    try {
      await savePreferences(preferences);
      return preferences; // Return saved preferences for store update
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to save preferences");
    }
  }
);

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Fetching Preferences**
      .addCase(fetchPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload.providers;
        state.categories = action.payload.categories;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // **Updating Preferences**
      .addCase(updatePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload.providers;
        state.categories = action.payload.categories;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default preferencesSlice.reducer;
