import { useState } from "react";
import { apiRequest } from "../../services/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setMessage("Thanks! Your message has been sent.");
      setForm({ name: "", email: "", phone: "", course: "", message: "" });
    } catch (err) {
      setError(err.message || "Unable to send your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

        <h2 className="text-4xl font-bold mb-8">
          Send us a Message
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            type="text"
            name="course"
            placeholder="Interested Course"
            value={form.course}
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-4 outline-none"
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="md:col-span-2 rounded-xl bg-slate-800 p-4 outline-none"
          />

          {message && <p className="md:col-span-2 rounded-xl bg-green-500/10 p-4 text-green-400">{message}</p>}
          {error && <p className="md:col-span-2 rounded-xl bg-red-500/10 p-4 text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </section>
  );
}