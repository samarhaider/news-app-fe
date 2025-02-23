import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { register } from "@redux/slices/authSlice";
import { TextField, Button, Box, Typography, Alert, Container } from "@mui/material";
import { Link } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  c_password: string;
}

const registerSchema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain at least one letter and one number")
    .required("Password is required"),
  c_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) window.location.href = "/news";
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Email" type="email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />
            )}
          />
          <Controller
            name="c_password"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Confirm Password" type="password" fullWidth margin="normal" error={!!errors.c_password} helperText={errors.c_password?.message} />
            )}
          />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Registering ..." : "Register"}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
