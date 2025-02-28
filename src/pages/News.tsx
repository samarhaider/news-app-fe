import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchNews } from "@redux/slices/newsSlice";
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Pagination} from "@mui/material";
import { debounce } from "lodash";
import { NewsApiRequest } from "@api/news";
import { providers, categories } from "@config";


const News = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);
  const [page, setPage] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const debouncedSearch = debounce((searchTerm: string) => {
    const newsReq = { search: searchTerm, categories: selectedCategories, providers: selectedProviders, page } as NewsApiRequest
    dispatch(fetchNews(newsReq));
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTitle);
    return () => debouncedSearch.cancel();
  }, [searchTitle, selectedCategories, selectedProviders, page]);
  
  useEffect(() => {
    const newsReq = { } as NewsApiRequest
    dispatch(fetchNews(newsReq));
  }, [dispatch]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" sx={{ mt: 4, mb: 2 }}>Latest News</Typography>

      {/* Show loading spinner */}
      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}

      {/* Show error message and Retry button */}
      {error && (
        <Box textAlign="center" sx={{ my: 3 }}>
          <Typography color="error">{error}</Typography>
          <Button variant="contained" color="secondary" onClick={() => dispatch(fetchNews())}>Retry</Button>
        </Box>
      )}
      <Box display="flex" gap={2} mb={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {categories.map(({key, value}) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Provider</InputLabel>
          <Select
            multiple
            value={selectedProviders}
            onChange={(e) => setSelectedProviders(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {providers.map(({key, value}) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem> 
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search Title"
          variant="outlined"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </Box>
      {/* News List */}
      <Grid container spacing={3}>
        {news?.data?.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={article.image || "https://fastly.picsum.photos/id/185/200/200.jpg?hmac=YNeKNCPhFVkjxUu5nB7ZP8UJVw_zYu3TPLI11_edSWc"} // Use placeholder if no image
                alt={article.title}
                onError={(e) => (e.currentTarget.src = "https://fastly.picsum.photos/id/185/200/200.jpg?hmac=YNeKNCPhFVkjxUu5nB7ZP8UJVw_zYu3TPLI11_edSWc")} // Handle broken images
              />
              <CardContent>
                <Typography variant="h6">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                    {article.title}
                  </a>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.description || "No description available."}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Provider: {article.provider} | Category: {article.category || "Uncategorized"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Published: {new Date(article.published_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination count={news.last_page} page={news.per_page} onChange={handlePageChange} color="primary" sx={{ mt: 2 }} />
    </Container>
  );
};

export default News;
