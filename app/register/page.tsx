"use client";

import RegisterForm from "../components/register-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-8 lg:px-6">
      <section className="grid gap-6 border-b border-stone-200 pb-8 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
            Register
          </p>
          <h1 className="text-4xl font-bold text-slate-950">
            Create Student Account
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Register one student account for this prototype. The account is
            saved in this browser and can be used to log in with a student ID.
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-950">Required fields</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <span className="rounded-full bg-stone-100 px-3 py-1">Name</span>
            <span className="rounded-full bg-stone-100 px-3 py-1">Email</span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              Student ID
            </span>
          </div>
        </div>
      </section>

      <RegisterForm redirectAfterSave="/" />
    </main>
  );
}
