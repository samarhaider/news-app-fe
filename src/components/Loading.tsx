import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: 9999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
