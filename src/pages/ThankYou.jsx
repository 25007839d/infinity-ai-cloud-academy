import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import qrCode from "../assets/images/whatsapp-channel.png";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6 py-16">

      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10">

        {/* Success */}

        <div className="text-center">

          <CheckCircle2
            size={90}
            className="mx-auto text-green-500"
          />

          <h1 className="text-5xl font-bold mt-6">
            Thank You!
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Your demo has been booked successfully.
          </p>

          <p className="text-gray-500 mt-2">
            Our team will contact you within 24 hours.
          </p>

        </div>

        {/* What's Next */}

        <div className="mt-12 grid lg:grid-cols-2 gap-8">

          {/* WhatsApp Group */}

          <div className="border rounded-2xl p-8">

            <MessageCircle
              className="text-green-600"
              size={48}
            />

            <h2 className="text-2xl font-bold mt-4">
              Join Demo WhatsApp Group
            </h2>

            <p className="text-gray-500 mt-3">
              Get demo reminders, Teams meeting links,
              and direct support.
            </p>

            <a
              href="https://chat.whatsapp.com/BlpwxVxSVec2CznnliXyEm?s=sh&p=a&mlu=0&amv=2"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              Join WhatsApp Group

              <ArrowRight size={18} />

            </a>

          </div>

          {/* WhatsApp Channel */}

          <div className="border rounded-2xl p-8 text-center">

            <h2 className="text-2xl font-bold">
              Follow Our Channel
            </h2>

            <p className="text-gray-500 mt-3">
              Stay updated with new batches,
              placement updates and free resources.
            </p>

            <img
              src={qrCode}
              alt="WhatsApp Channel QR"
              className="w-48 mx-auto mt-6 rounded-xl"
            />

            <a
              href="https://whatsapp.com/channel/0029Vb84LuMAojZ1hBcNgw3t"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Follow WhatsApp Channel
            </a>

          </div>

        </div>

        {/* Bottom */}

        <div className="text-center mt-12">

          <Link
            to="/"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-black transition"
          >
            Return to Home
          </Link>

        </div>

      </div>

    </div>
  );
}