
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Categories", href: "/categories" },
  { label: "Contact", href: "/contact" },
];

export default function NavbarLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={
        mobile
          ? "space-y-1"
          : "hidden items-center space-x-10 md:flex"
      }
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={
            mobile
              ? "block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
              : "text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
          }
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
