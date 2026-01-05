import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Success from "./Pages/Success";
import Failure from "./Pages/Failure";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failed" element={<Failure />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
