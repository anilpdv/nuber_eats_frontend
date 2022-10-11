import { gql, useQuery } from "@apollo/client";
import Alert from "../components/common/alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurant from "../pages/client/restaurant";
import Header from "../components/common/Header";
import PageNotFound from "../components/PageNotFound";
import { useMe } from "../hooks/useMe";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Restaurant />}></Route>
    </Routes>
  );
};

export default function LoggedInRouter() {
  const { data, error, loading } = useMe();
  console.log({ error, data });
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        {data?.me?.role === "Client" && (
          <Route path="/" element={<ClientRoutes />}></Route>
        )}
      </Routes>
    </Router>
  );
}
