import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Heading from "../../../components/Heading";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/share/CustomButton";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email("Invalid email").required("Insert email"),
        password: yup.string().required("Insert password"),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    dispatch(
      authActions.login({
        params: data,
        onNavigate: () => {
          navigate("/home");
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px" sx={{ pb: 1 }}>
        <Heading title="Welcome back" subtitle="Login to your account!" />
        <TextField
          id="email"
          label="Email"
          inputProps={{ ...register("email") }}
          error={!!errors.email?.message}
          required
          helperText={errors.email?.message}
        />
        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          inputProps={{ ...register("password") }}
          error={!!errors.password?.message}
          required
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CustomButton color="primary" type="submit" label="Login" />
      </Stack>
    </form>
  );
};

export default Login;
