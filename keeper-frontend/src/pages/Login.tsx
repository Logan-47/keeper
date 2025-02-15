import { useEffect } from "react";
import { useAuthContext } from "../context/Auth/useAuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string(),
  password: yup.string(),
});

const Login = () => {
  const { login, email } = useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSignupClick = () => {
    navigate('/signup')
  }

  useEffect(() => {
      if(email) {
        navigate('/manage');
      }
    }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    await login(data.email, data.password);
    navigate("/manage");
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded">
      <h2 className="text-2xl">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
        <p className="text-red-500">{errors.email?.message}</p>

        <input type="password" {...register("password")} placeholder="Password" className="border p-2 w-full mt-2" />
        <p className="text-red-500">{errors.password?.message}</p>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-4">Login</button>
      </form>
      <button onClick={onSignupClick}>signup</button>
    </div>
  );
};

export default Login;