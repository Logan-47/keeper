import { useAuthContext } from "../context/Auth/useAuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),

});

const Signup = () => {
  const { signup, email } = useAuthContext();
  
  const navigate = useNavigate();
  const { 
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema),
    });

  useEffect(() => {
    if(email) {
      navigate('/manage');
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    await signup(data.name, data.email, data.password);
    navigate("/manage");
  };
  return (
    
    <div className="max-w-md mx-auto p-6 border rounded">
      <h2 className="text-2xl">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" className="border p-2 w-full" />
      <p className="text-red-500">{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
        <p className="text-red-500">{errors.email?.message}</p>

        <input type="password" {...register("password")} placeholder="Password" className="border p-2 w-full mt-2" />
        <p className="text-red-500">{errors.password?.message}</p>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-4">Signup</button>
      </form>
    </div>
  );
};

export default Signup;