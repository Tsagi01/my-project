"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBasket } from "../context/basket-context";
import { useStudent } from "../context/student-context";

export default function SiteHeader() {
  const { itemCount } = useBasket();
  const { logout, student } = useStudent();
  const pathname = usePathname();

  function navLinkClass(isActive: boolean) {
    return `rounded-md px-3 py-2 transition ${
      isActive
        ? "bg-blue-50 text-blue-800"
        : "hover:bg-stone-100 hover:text-slate-950"
    }`;
  }

  return (
    <header className="border-b border-stone-200 bg-white text-slate-950">
      <div className="bg-blue-950 px-5 py-2 text-center text-xs font-semibold text-white">
        Student resource ordering for SQA Advanced Higher Computing
      </div>

      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-bold">
            357 Ltd
          </Link>
          <span className="hidden h-5 w-px bg-stone-300 sm:block" />
          <p className="text-sm text-slate-600">
            {student ? `Signed in as ${student.fullName}` : "Student ordering"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-700">
          <Link
            href="/?page=1#products"
            className={navLinkClass(pathname === "/" || pathname.startsWith("/products"))}
          >
            Products
          </Link>
          <Link
            href="/basket"
            className={navLinkClass(
              pathname === "/basket" ||
                pathname === "/payment" ||
                pathname === "/confirmation",
            )}
          >
            Basket ({itemCount})
          </Link>
          {student ? (
            <>
              <Link
                href="/register"
                className={navLinkClass(pathname === "/register")}
              >
                Account
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-stone-300 bg-white px-3 py-2 text-slate-800 transition hover:bg-stone-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md border border-stone-300 px-3 py-2 transition hover:bg-stone-100 hover:text-slate-950"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
