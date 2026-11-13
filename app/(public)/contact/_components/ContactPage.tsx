
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  MessageCircle,
  Headphones,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "yasirarafatalif1@gmail.com.com",
    description: "Send us an email anytime.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1552-637335",
    description: "Our team is here to help.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Faidabad, Uttara, Dhaka, Bangladesh",
    description: "Serving customers across Bangladesh.",
    color: "bg-orange-50 text-orange-600",
  },
];

const faqs = [
  {
    question: "How can I book a service?",
    answer:
      "Browse our service categories, choose your preferred service, and follow the booking process to request a professional technician.",
  },
  {
    question: "How can I contact a technician?",
    answer:
      "Once your booking is confirmed, you can check your booking details and use the available communication options.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Booking cancellation depends on the booking status and our cancellation policy. Check your booking details for available options.",
  },
  {
    question: "How do I become a technician?",
    answer:
      "You can register through FixItNow as a technician and complete the required profile information to get started.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

    if (!email) {
      alert("Contact form email is not configured yet.");
      return;
    }

    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;

    window.location.href = mailto;
  };

  return (
    <main className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-950 px-4 py-20 sm:px-6 lg:py-28">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-300">
            <MessageCircle size={16} />
            We're Here To Help
          </span>

          <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let's Start a{" "}
            <span className="text-blue-400">Conversation.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Have a question, need assistance, or want to know more about
            our services? We'd love to hear from you. Our team is ready
            to help.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-400" />
              Reliable Support
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <span className="flex items-center gap-2">
              <Clock size={17} className="text-blue-400" />
              Quick Response
            </span>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 font-semibold text-blue-600">
                  {item.value}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Contact Us
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              We'd Love To
              <br />
              <span className="text-blue-600">Hear From You.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
              Whether you need help with a booking, have questions about
              our services, or want to share feedback, just send us a
              message.
            </p>

            <div className="mt-9 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Headphones size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Customer Support
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Get assistance with your bookings and service
                    inquiries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    We're Listening
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Your feedback helps us improve the FixItNow
                    experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-blue-50 p-6">
              <p className="text-sm font-semibold text-blue-900">
                Need help right away?
              </p>
              <p className="mt-2 text-sm leading-6 text-blue-800/70">
                Reach out to our support team using the contact details
                above.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
            <h3 className="text-2xl font-bold text-slate-900">
              Send Us a Message
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Fill out the form and tell us how we can help.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  required
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Message
                </label>
                <textarea
                  required
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
              >
                Send Message
                <Send size={17} />
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Your information will only be used to respond to your
                inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              FAQs
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Find quick answers to some common questions.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-slate-800">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-slate-400 transition-transform ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeFaq === index && (
                  <div className="px-5 pb-5 text-sm leading-7 text-slate-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 rounded-3xl bg-blue-600 px-7 py-12 text-center sm:px-12 lg:flex-row lg:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Need a professional service?
            </h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              Explore our services and find the right expert for your needs.
            </p>
          </div>

          <Link href="/services"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            Explore Services
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
