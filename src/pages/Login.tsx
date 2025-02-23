import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { login } from "@redux/slices/authSlice";
import { Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert, Container } from "@mui/material";

interface LoginForm {
  name: string;
  email: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) window.location.href = "/news";
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5">Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField fullWidth label="Email" margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
      <TextField fullWidth label="Password" type="password" margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
      <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>

    </Box>
  );
};

export default Login;
