"use client";

import RegisterForm from "../components/register-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-8">
      <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Step 1
        </p>
        <h1 className="mb-3 text-3xl font-bold">Create Student Account</h1>
        <p className="text-slate-800">
          This is a simple prototype register page. It saves one student
          account in the browser only, with no database and no advanced
          authentication.
        </p>
      </section>

      <RegisterForm redirectAfterSave="/" />
    </main>
  );
}
