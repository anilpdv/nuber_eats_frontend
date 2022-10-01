import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

export default function Login() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<ILoginForm>();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="font-bold text-2xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            name="email"
            type={"email"}
            className="input mb-3"
          />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            name="password"
            type={"password"}
            className="input"
          />
          <button className="mt-3 btn">Log In</button>
        </form>
      </div>
    </div>
  );
}
