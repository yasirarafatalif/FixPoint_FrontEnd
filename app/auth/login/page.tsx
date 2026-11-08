import LoginForm from "../_components/LoginFrom";

export const metadata={
  title:"FixitNow | Login page",
  description:"Login page for FixPoint"
}


export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}