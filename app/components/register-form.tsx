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
        <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Saved Account
          </h2>
          <p className="text-slate-800">Name: {student.fullName}</p>
          <p className="text-slate-800">Email: {student.email}</p>
          <p className="text-slate-800">Student ID: {student.studentId}</p>
        </section>
      ) : null}

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Register Form</h2>

        {/* The form is intentionally simple so it is easy to understand. */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-900">Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-900">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-900">Student ID</span>
            <input
              type="text"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              required
              className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              placeholder="Enter your student ID"
            />
          </label>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Save Account
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              Clear Saved Account
            </button>

            {showBackLink ? (
              <Link
                href="/?page=1#products"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
              >
                Back to Products
              </Link>
            ) : null}
          </div>
        </form>

        {successMessage ? (
          <p className="mt-4 text-sm font-medium text-green-700">
            {successMessage}
          </p>
        ) : null}
      </section>
    </>
  );
}
