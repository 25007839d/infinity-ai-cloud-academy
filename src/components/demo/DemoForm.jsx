import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDemo } from "../../services/demoService";

export default function DemoForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.course ||
      !formData.experience
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      await registerDemo(formData);

      // Reset Form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        experience: "",
      });

      // Redirect to Thank You Page
      navigate("/thank-you", {
        state: {
          name: formData.fullName,
          course: formData.course,
        },
      });

    } catch (error) {
      console.error("Demo Booking Error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 text-black">

      <h2 className="text-4xl font-bold">
        Book Your Free Demo
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Fill in your details and our team will contact you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}

        <div>
          <label className="block mb-2 font-medium">
            Full Name *
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}

        <div>
          <label className="block mb-2 font-medium">
            Email Address *
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile */}

        <div>
          <label className="block mb-2 font-medium">
            Mobile Number *
          </label>

          <input
            type="tel"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Course */}

        <div>
          <label className="block mb-2 font-medium">
            Interested Course *
          </label>

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>

            <option value="Data Engineering">
              Data Engineering
            </option>

            <option value="Generative AI">
              Generative AI
            </option>

            <option value="Google Cloud">
              Google Cloud
            </option>

            <option value="AWS Data Engineering">
              AWS Data Engineering
            </option>

            <option value="Azure Data Engineering">
              Azure Data Engineering
            </option>

            <option value="Python for Data Engineering">
              Python for Data Engineering
            </option>

          </select>
        </div>

        {/* Experience */}

        <div>
          <label className="block mb-2 font-medium">
            Experience *
          </label>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Experience</option>

            <option value="Fresher">Fresher</option>

            <option value="0-1 Years">0-1 Years</option>

            <option value="1-3 Years">1-3 Years</option>

            <option value="3-5 Years">3-5 Years</option>

            <option value="5+ Years">5+ Years</option>

          </select>
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Booking Your Demo..." : "Book My Free Demo"}
        </button>

        {/* Security Note */}

        <p className="text-center text-sm text-gray-500 mt-3">
          🔒 Your information is secure and will only be used to contact you regarding your demo session.
        </p>

      </form>
    </div>
  );
}