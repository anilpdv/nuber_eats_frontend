import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import LoggedInRouter from "./routers/login-in-router";
import LoggedOutRouter from "./routers/login-out-router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="flex">
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </div>
  );
}

export default App;
