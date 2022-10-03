import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/utils/common/form-error";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  UserRole,
} from "../__generated__/global";
import logo from "../images/logo.svg";
import Button from "../components/utils/common/button";
import { Link } from "react-router-dom";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export default function CreateAccount() {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({ mode: "onChange" });

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { error, ok },
    } = data;
    if (ok) {
      console.log({ ok });
    }
  };

  const [createAccountMutation, { data, loading }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onSubmit = () => {
    const { email, password } = getValues();
    createAccountMutation({
      variables: {
        createAccountInput: { email, password, role: UserRole.Client },
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
          {data?.createAccount.error && (
            <FormError errorMessage={data.createAccount.error} />
          )}
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
