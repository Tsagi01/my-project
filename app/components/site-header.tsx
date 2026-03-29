"use client";

import Link from "next/link";
import { useBasket } from "../context/basket-context";

export default function SiteHeader() {
  const { itemCount } = useBasket();

  return (
    <nav className="border-b border-blue-200 bg-blue-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-lg font-bold">357 Ltd</p>
          <p className="text-sm text-blue-100">Online Ordering Prototype</p>
        </div>

        <div className="flex gap-4 text-sm font-medium text-white">
          <Link
            href="/?page=1#products"
            className="rounded-md px-3 py-2 hover:bg-blue-800"
          >
            Products
          </Link>
          <Link href="/basket" className="rounded-md px-3 py-2 hover:bg-blue-800">
            Basket ({itemCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}
