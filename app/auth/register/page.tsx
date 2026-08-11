import React from 'react';
import { Metadata } from 'next';
import RegisterForm from '../_components/RegisterForm';


export const metadata: Metadata = {
  title: 'Register | FixItNow',
  description: 'Create an account on FixItNow as a Customer or Technician.',
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Create an account
        </h1>
        <p className="text-sm text-slate-500">
          Select your role and enter your details to get started
        </p>
      </div>

      {/* Client Component Rendering */}
      <RegisterForm />
    </div>
  );
}