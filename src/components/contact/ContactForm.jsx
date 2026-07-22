import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Next step: Connect this form with Supabase.");
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

          <button
            type="submit"
            className="md:col-span-2 rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700"
          >
            Send Message
          </button>

        </form>

      </div>
    </section>
  );
}