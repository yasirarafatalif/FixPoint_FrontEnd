import ProfileClient from "./_components/ProfileClient";
export const metadata = {
  title: "FixitNow | Technician Profile Setup",
  description: "Technician profile setup page for FixPoint",
};


export default function TechnicianProfileSetupPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ProfileClient />
      </div>
    </div>
  );
}