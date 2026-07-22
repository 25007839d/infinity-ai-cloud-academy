import { Routes, Route, Navigate } from "react-router-dom";

// ================= WEBSITE =================

import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Roadmaps from "../pages/Roadmaps";
import Projects from "../pages/Projects";
import Resources from "../pages/Resources";
import About from "../pages/About";
import Contact from "../pages/Contact";
import BookDemo from "../pages/BookDemo";
import ThankYou from "../pages/ThankYou";
import NotFound from "../pages/NotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
// ================= ADMIN =================

import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import DemoRegistrations from "../admin/pages/DemoRegistrations";
import Analytics from "../admin/pages/Analytics";

// ================= PROTECTED ROUTE =================

import ProtectedRoute from "../admin/routes/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= WEBSITE ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/courses" element={<Courses />} />

      <Route
        path="/courses/:slug"
        element={<CourseDetails />}
      />

      <Route
        path="/roadmaps"
        element={<Roadmaps />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/resources"
        element={<Resources />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/book-demo"
        element={<BookDemo />}
      />

      <Route
        path="/thank-you"
        element={<ThankYou />}
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route path="/terms" element={<Terms />} />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={<Navigate to="/admin/login" replace />}
      />

      <Route
        path="/admin/login"
        element={<Login />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/demo-registrations"
        element={
          <ProtectedRoute>
            <DemoRegistrations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}