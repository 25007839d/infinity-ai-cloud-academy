import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDemo } from "../../services/demoService";

export default function DemoForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    course: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.course ||
      !formData.experience
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      await registerDemo(formData);

      navigate("/thank-you");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
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
        Fill in your details and our team will contact you.
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

            <option>Data Engineering</option>

            <option>Generative AI</option>

            <option>Google Cloud</option>

            <option>AWS Data Engineering</option>

            <option>Azure Data Engineering</option>

            <option>Python for Data Engineering</option>

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

            <option>Fresher</option>

            <option>0-1 Years</option>

            <option>1-3 Years</option>

            <option>3-5 Years</option>

            <option>5+ Years</option>

          </select>
        </div>

        {/* Button */}

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
          🔒 Your information is secure and will only be used to contact you
          regarding your demo session.
        </p>

      </form>
    </div>
  );
}