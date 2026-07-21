import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import BookDemo from "../pages/BookDemo";
import ThankYou from "../pages/ThankYou";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter basename="/infinity-ai-cloud-academy">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}