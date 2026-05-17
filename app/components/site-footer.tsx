import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-6">
        <div>
          <Link href="/" className="text-xl font-bold text-slate-950">
            357 Ltd
          </Link>
          <p className="mt-3 max-w-sm">
            A student-focused ordering prototype for computing books, media,
            software, and hardware resources.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-slate-950">Shop</h2>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/?page=1#products" className="hover:text-slate-950">
              Product catalogue
            </Link>
            <Link href="/basket" className="hover:text-slate-950">
              Basket
            </Link>
            <Link href="/payment" className="hover:text-slate-950">
              Payment
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-slate-950">Account</h2>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/login" className="hover:text-slate-950">
              Login
            </Link>
            <Link href="/register" className="hover:text-slate-950">
              Register
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
