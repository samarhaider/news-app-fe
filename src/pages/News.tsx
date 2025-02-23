import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchNews } from "@redux/slices/newsSlice";
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, CircularProgress, Container } from "@mui/material";

const News = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

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

      {/* News List */}
      <Grid container spacing={3}>
        {news?.map((article) => (
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
    </Container>
  );
};

export default News;
