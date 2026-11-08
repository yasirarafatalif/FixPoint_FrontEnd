"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  UserCheck,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
// import toast from "react-hot-toast";

import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import { registerAction } from "@/app/auth/_actions/authAction";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "TECHNICIAN">("CUSTOMER");
  

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Password validation
  const passwordError =
    passwordTouched && password.length > 0 && password.length < 8
      ? "Password must be at least 8 characters."
      : "";

  const confirmPasswordError =
    confirmTouched && confirmPassword.length > 0 && password !== confirmPassword
      ? "Passwords do not match."
      : "";

  const passwordsMatch =
    password.length >= 8 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setPasswordTouched(true);
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmTouched(true);
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerAction({
        name: name.trim(),
        email: email.trim(),
        password,
        role
      });
  

      if (!result.success) {
        toast.error(result.message);
        throw new Error(result.message);
      }

      toast.success("Account created successfully! Please login.");

      setTimeout(() => {
        router.push("/auth/login?registered=true");
      }, 1500);

      if (!result.success) {
        throw new Error(result.message);
      }

      // toast.success("Account created successfully! Please login.");

      // setTimeout(() => {
      //   router.push("/auth/login?registered=true");
      // }, 1500);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <User size={26} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Create Your Account
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Join FixItNow and get your home services easily.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          <AlertCircle size={19} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      {/* Account Type Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">
          Select Account Type
        </label>

        <div className="grid grid-cols-2 gap-3">
          {/* Customer */}
          <button
            type="button"
            onClick={() => setRole("CUSTOMER")}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              role === "CUSTOMER"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-blue-300"
            }`}
          >
            <User
              size={23}
              className={
                role === "CUSTOMER" ? "text-blue-600" : "text-slate-400"
              }
            />

            <h3 className="mt-2 font-semibold text-slate-900">Customer</h3>

            <p className="mt-1 text-xs text-slate-500">
              Book home services easily.
            </p>

            {role === "CUSTOMER" && (
              <CheckCircle2 size={18} className="mt-3 text-blue-600" />
            )}
          </button>

          {/* Technician */}
          <button
            type="button"
            onClick={() => setRole("TECHNICIAN")}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              role === "TECHNICIAN"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-blue-300"
            }`}
          >
            <UserCheck
              size={23}
              className={
                role === "TECHNICIAN" ? "text-blue-600" : "text-slate-400"
              }
            />

            <h3 className="mt-2 font-semibold text-slate-900">Technician</h3>

            <p className="mt-1 text-xs text-slate-500">
              Provide services and earn.
            </p>

            {role === "TECHNICIAN" && (
              <CheckCircle2 size={18} className="mt-3 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <FormInput
          id="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={setName}
          icon={UserCheck}
        />

        {/* Email */}
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={setEmail}
          icon={Mail}
        />

        {/* Password */}
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setPasswordTouched(true);
            setErrorMessage(null);
          }}
          placeholder="Create a password"
          error={passwordError}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            setConfirmTouched(true);
            setErrorMessage(null);
          }}
          placeholder="Confirm your password"
          error={confirmPasswordError}
        />

        {/* Password Match Success */}
        {passwordsMatch && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600">
            <CheckCircle2 size={17} />
            Passwords matched successfully!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Customer Account"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
