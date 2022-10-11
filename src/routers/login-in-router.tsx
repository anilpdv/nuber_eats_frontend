import { gql, useQuery } from "@apollo/client";
import Alert from "../components/utils/alert";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export default function LoggedInRouter() {
  const { data, error, loading } = useQuery(ME_QUERY);
  console.log({ error, data });
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">loading...</span>
      </div>
    );
  }
  return (
    <div>
      {error?.message && <Alert errorMessage={error?.message} type={"error"} />}
      <h1>LoggedIN</h1>
      <button onClick={() => {}}>Log out</button>
    </div>
  );
}
