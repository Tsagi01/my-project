"use client";

import RegisterForm from "./register-form";
import { useStudent } from "../context/student-context";

export default function AccountGate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { student } = useStudent();

  if (!student) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-8">
        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Step 1
          </p>
          <h1 className="mb-3 text-3xl font-bold">Create Student Account</h1>
          <p className="text-slate-800">
            Please create a student account before entering the shopping
            interface.
          </p>
        </section>

        <RegisterForm showBackLink={false} />
      </main>
    );
  }

  return <>{children}</>;
}
