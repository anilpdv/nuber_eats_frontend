import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/utils/common/form-error";
import { LoginMutation, LoginMutationVariables } from "../__generated__/global";
import logo from "../images/logo.svg";
import Button from "../components/utils/common/button";
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: "onChange" });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log({ token });
    }
  };

  const [loginMutation, { data, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className="h-screen w-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col items-center">
        <img src={logo} className="w-56 m-10" />
        <form
          className="grid gap-4 flex flex-col mt-5 px-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <input
              {...register("email", { required: "email is required" })}
              placeholder="Email"
              name="email"
              type={"email"}
              className="input"
            />
            {errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            )}
          </div>
          <div className="flex flex-col">
            <input
              {...register("password", {
                required: "password is required",
                minLength: 5,
              })}
              placeholder="Password"
              name="password"
              type={"password"}
              className="input"
            />
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}

            {errors.password?.type === "minLength" && (
              <span className="font-medium text-red-500">
                {"Password must be more than 5 characters"}
              </span>
            )}
          </div>
          <Button loading={loading} isValid={isValid} actionText="Login" />
          {data?.login.error && <FormError errorMessage={data.login.error} />}
        </form>
        <div className="m-6">
          <span>New to uber?</span>
          <Link to="create-account" className="text-green-500 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
