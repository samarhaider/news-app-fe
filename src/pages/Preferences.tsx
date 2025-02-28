import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, Button, Box, Typography, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchPreferences, updatePreferences } from "@redux/slices/preferencesSlice";
import { providers as providersList, categories as categoriesList } from "@config";

interface PreferencesForm {
  providers: string[];
  categories: string[];
}

const Preferences = () => {
  const dispatch = useAppDispatch();
  const { providers, categories, loading, error } = useAppSelector((state) => state.preferences || { providers: [], categories: [] });

  const { handleSubmit, control, setValue } = useForm<PreferencesForm>({
    defaultValues: { providers: [], categories: [] },
  });

  useEffect(() => {
    dispatch(fetchPreferences()).then((action) => {
      if (fetchPreferences.fulfilled.match(action)) {
        setValue("providers", action.payload.providers || []);
        setValue("categories", action.payload.categories || []);
      }
    });
  }, [dispatch, setValue]);

  const onSubmit = (data: PreferencesForm) => {
    dispatch(updatePreferences(data));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center">Set Your Preferences</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel>News Providers</InputLabel>
            <Controller
              name="providers"
              control={control}
              render={({ field }) => (
                <Select {...field} multiple renderValue={(selected) => selected.join(", ")}>
                  {providersList.forEach((key, value) => (
                    <MenuItem key={key} value={value}>
                      <Checkbox checked={field.value?.includes(value)} />
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Categories</InputLabel>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Select {...field} multiple renderValue={(selected) => selected.join(", ")}>
                  {categoriesList.map(({key, value}) => (
                    <MenuItem key={key} value={value}>
                      <Checkbox checked={field.value?.includes(value)} />
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading} sx={{ mt: 2 }}>
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Preferences;
