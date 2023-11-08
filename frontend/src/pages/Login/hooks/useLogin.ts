import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosFetch from "@/config/axiosFetch";
import useToast from "@/hooks/useToast";
import { login } from "@/slices/user/userSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (user: LoginFormValues) => {
      return axiosFetch.post("/login", user);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        toast("Success", data.data.message, "success");
        dispatch(login(data.data.accessToken));
        reset();
        navigate("/");
      },
      onError: (error: any) =>
        toast("Error", error.response.data.message, "error"),
    });
  };

  const handleShowPassword = () => {
    //@ts-ignore
    setShowPassword((prevState) => (prevState = !showPassword));
  };

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    handleShowPassword,
    showPassword,
    mutation,
  };
}
