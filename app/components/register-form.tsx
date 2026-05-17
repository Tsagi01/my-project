"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStudent } from "../context/student-context";

type RegisterFormProps = {
  redirectAfterSave?: string;
  showBackLink?: boolean;
};

export default function RegisterForm({
  redirectAfterSave,
  showBackLink = true,
}: Readonly<RegisterFormProps>) {
  const router = useRouter();
  const { clearStudent, saveStudent, student } = useStudent();

  // Simple local form state for the registration form.
  const [fullName, setFullName] = useState(student?.fullName ?? "");
  const [email, setEmail] = useState(student?.email ?? "");
  const [studentId, setStudentId] = useState(student?.studentId ?? "");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    saveStudent({
      fullName: fullName.trim(),
      email: email.trim(),
      studentId: studentId.trim(),
    });

    if (redirectAfterSave) {
      router.push(redirectAfterSave);
      return;
    }

    setSuccessMessage("Account saved successfully. You can continue shopping.");
  }

  function handleClear() {
    clearStudent();
    setFullName("");
    setEmail("");
    setStudentId("");
    setSuccessMessage("Saved account removed.");
  }

  return (
    <>
      {student ? (
        <section className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h2 className="mb-3 text-lg font-semibold text-slate-950">
            Saved Account
          </h2>
          <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-3">
            <p>
              <span className="block font-semibold text-slate-950">Name</span>
              {student.fullName}
            </p>
            <p>
              <span className="block font-semibold text-slate-950">Email</span>
              {student.email}
            </p>
            <p>
              <span className="block font-semibold text-slate-950">Student ID</span>
              {student.studentId}
            </p>
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-1 text-xl font-semibold text-slate-950">
          Student details
        </h2>
        <p className="mb-5 text-sm text-slate-600">
          Save or update the student account used for this browser.
        </p>

        {/* The form is intentionally simple so it is easy to understand. */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-900">Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="rounded-md border border-stone-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
              placeholder="Enter your full name"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-900">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="rounded-md border border-stone-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
              placeholder="Enter your email"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-900">Student ID</span>
            <input
              type="text"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              required
              className="rounded-md border border-stone-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
              placeholder="Enter your student ID"
            />
          </label>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Save Account
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-stone-100"
            >
              Clear Account
            </button>

            {showBackLink ? (
              <Link
                href="/?page=1#products"
                className="rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-stone-100"
              >
                Back to Products
              </Link>
            ) : null}
          </div>
        </form>

        {successMessage ? (
          <p className="mt-4 rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
            {successMessage}
          </p>
        ) : null}
      </section>
    </>
  );
}
