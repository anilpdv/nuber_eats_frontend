import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";
export default function LoggedOutRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}
