
import Link from "next/link";
import {
  Wrench,
  Share2,
  Camera,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Services", href: "/services" },
  { name: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { name: "Plumbing", href: "/services" },
  { name: "Electrical", href: "/services" },
  { name: "Home Cleaning", href: "/services" },
  { name: "AC Repair", href: "/services" },
  { name: "Painting", href: "/services" },
];

const supportLinks = [
  { name: "Help Center", href: "/contact" },
  { name: "FAQs", href: "/contact" },
  { name: "Privacy Policy", href: "/contact" },
  { name: "Terms & Conditions", href: "/contact" },
];

const socialLinks = [
  { icon: FaFacebook , href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b1730] text-white">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top CTA */}
        <div className="relative -top-0 -mb-1 pt-12">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600 to-indigo-600 p-7 shadow-xl shadow-blue-950/20 md:flex-row md:p-10">

            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Need a Hand with Home Repairs?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100">
                Let FixItNow connect you with skilled professionals.
                Book your next home service with confidence.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition duration-300 hover:bg-blue-50 hover:shadow-lg"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand Information */}
          <div className="lg:col-span-4">

            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
                <Wrench size={26} className="text-white" />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                FixIt<span className="text-blue-400">Now</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-8 text-slate-400">
              Your trusted partner for everyday home services.
              We make it easier to find skilled professionals
              and get your home problems fixed without hassle.
            </p>

            {/* Trust Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <ShieldCheck size={20} className="text-blue-400" />
              <span className="text-xs font-medium text-slate-300">
                Your Home, Our Responsibility
              </span>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">

            <h3 className="mb-7 text-base font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-blue-500 opacity-0 transition group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Services */}
          <div className="lg:col-span-3">

            <h3 className="mb-7 text-base font-bold text-white">
              Popular Services
            </h3>

            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-blue-500 opacity-0 transition group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Support & Contact */}
          <div className="lg:col-span-3">

            <h3 className="mb-7 text-base font-bold text-white">
              Get in Touch
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Our Location
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Faidabad, Uttara, Dhaka -1230
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Call Us
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    01851973300 || 01552637335
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Email Us
                  </p>
                  <Link
                    href="/contact"
                    className="mt-1 block text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    yasirarafatalif1@gmail.com
                  </Link>
                </div>
              </div>

            </div>

            <div className="mt-7">
              <h4 className="mb-4 text-sm font-semibold text-white">
                Customer Support
              </h4>

              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-7">

          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} FixItNow. All rights reserved.
            </p>

            <p className="text-sm text-slate-500">
              Made with{" "}
              <span className="text-red-400">♥</span>
              {" "}for better living.
            </p>

            <Link
              href="/"
              className="text-sm font-medium text-slate-400 transition hover:text-blue-400"
            >
              Back to Home ↑
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}
