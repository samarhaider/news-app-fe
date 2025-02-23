import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { logout } from "@redux/slices/authSlice";

const Header = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          News App
        </Typography>

        {token ? <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/preferences">
            Preferences
          </Button>
          <Button color="inherit" component={Link} to="/news">
            News
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box> :
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Box>}
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
