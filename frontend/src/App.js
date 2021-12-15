import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Subscription from "./components/Subscription";
import PaymentSuccess from "./components/PaymentSuccess";
import Users from "./components/Users";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Details from "./components/Details";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="subscription" element={<Subscription />} />
          <Route path="payment-successful" element={<PaymentSuccess />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
