"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStudent } from "../context/student-context";

type LoginFormProps = {
  redirectTo: string;
};

export default function LoginForm({ redirectTo }: Readonly<LoginFormProps>) {
  const router = useRouter();
  const { loginWithStudentId, registeredStudent, student } = useStudent();
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (student) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router, student]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = loginWithStudentId(studentId);
    setMessage(result.message);

    if (result.success) {
      router.replace(redirectTo);
    }
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Student login</h2>
      <p className="mt-1 text-sm text-slate-600">
        Enter your student ID to access the ordering catalogue.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-900">
            Student ID
          </span>
          <input
            type="text"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
            required
            className="rounded-md border border-stone-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            placeholder="Enter your student ID"
          />
        </label>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {message ? (
        <p className="mt-4 rounded-md bg-stone-100 px-3 py-2 text-sm font-semibold text-slate-700">
          {message}
        </p>
      ) : null}

      <div className="mt-5 border-t border-stone-200 pt-4 text-sm text-slate-600">
        {registeredStudent ? (
          <p>
            Registered account:{" "}
            <span className="font-semibold text-slate-950">
              {registeredStudent.fullName}
            </span>
          </p>
        ) : (
          <p>No student account is registered in this browser yet.</p>
        )}
        <Link
          href="/register"
          className="mt-3 inline-flex rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-stone-100"
        >
          Create or update account
        </Link>
      </div>
    </section>
  );
}
