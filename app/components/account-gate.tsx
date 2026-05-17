"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useStudent } from "../context/student-context";

function subscribeToClientReady() {
  return () => {};
}

function getClientReadySnapshot() {
  return true;
}

function getServerReadySnapshot() {
  return false;
}

export default function AccountGate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { student } = useStudent();
  const router = useRouter();
  const isClientReady = useSyncExternalStore(
    subscribeToClientReady,
    getClientReadySnapshot,
    getServerReadySnapshot,
  );

  useEffect(() => {
    if (!isClientReady || student) {
      return;
    }

    const currentPath = `${window.location.pathname}${window.location.search}`;
    router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
  }, [isClientReady, router, student]);

  if (!isClientReady || !student) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-5 py-12 lg:px-6">
        <div className="w-full rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-blue-600">
            Checking access
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">
            Student login required
          </h1>
          <p className="mt-2 text-slate-600">
            Redirecting you to the login page.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
