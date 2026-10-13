import { getTechnicianProfile } from "@/service/technicianService";
import TechnicianProfileForm from "./_components/TechnicianProfileForm";


export default async function TechnicianProfilePage() {
  const result = await getTechnicianProfile();

  if (!result.success || !result.data) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Failed to load profile
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {result.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <TechnicianProfileForm profile={result.data} />
    </div>
  );
}