import LoginPanel from "./components/Login/Login";
import RegisterPanel from "./components/Register/Register";
import DealersPanel from "./components/Dealers/Dealers";
import DealerPanel from "./components/Dealers/Dealer";
import PostReviewPanel from './components/Dealers/PostReview'

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/dealers" element={<DealersPanel />} />
      <Route path="/dealer/:id" element={<DealerPanel />} />
      <Route path="/postreview/:id" element={<PostReviewPanel />} />
    </Routes>
  );
}
export default App;
