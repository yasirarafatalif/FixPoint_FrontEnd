import RegisterForm from "./_components/RegisterForm";
export const metadata ={
  title: "FixtNow | Register page",
  description: "Register page for FixPoint",
}



export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}
