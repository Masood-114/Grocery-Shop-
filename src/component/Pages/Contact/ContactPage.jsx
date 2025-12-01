import { useContext, useState } from "react";
import { CartContext } from "../../../Context/CartContext";

export default function ContactPage() {
  const { contactData } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    contactData(formData);

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // For now, just log data or you can send to backend
    console.log("Contact form submitted:", formData);

    // Reset form & show success
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-5 py-35 px-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {success && (
        <p className="mb-4 text-green-600 font-semibold">
          Your message has been sent successfully!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className=" shadow-md rounded-lg p-6 space-y-4 bg-gray-200"
      >
        <div>
          <label className="block font-semibold mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Message*</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-b from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:scale-105 hover:to-orange-600 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
