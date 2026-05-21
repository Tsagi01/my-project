"use client";

import AccountGate from "../components/account-gate";
import Link from "next/link";
import { useBasket } from "../context/basket-context";

export default function BasketPage() {
  const {
    items,
    basketTotal,
    clearBasket,
    increaseQuantity,
    decreaseQuantity,
    removeFromBasket,
  } = useBasket();

  function handleClearBasket() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the basket?",
    );

    if (!confirmed) {
      return;
    }

    clearBasket();
  }

  return (
    <AccountGate>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-8 lg:px-6">
        <section className="border-b border-stone-200 pb-6">
          <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/?page=1#products">Shop</Link>
            <span>/</span>
            <span className="font-semibold text-slate-950">Basket</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
            Basket
          </p>
          <h1 className="text-4xl font-bold text-slate-950">Your Basket</h1>
          <p className="max-w-3xl text-slate-600">
            Review quantities, remove items, and check the running total before
            selecting a payment method.
          </p>
        </section>

        {items.length === 0 ? (
          <section className="rounded-lg border border-blue-100 bg-blue-50/40 p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-white text-2xl font-bold text-blue-700 shadow-sm">
              0
            </div>
            <h2 className="mb-2 text-xl font-semibold text-slate-950">
              Basket is empty
            </h2>
            <p className="mx-auto mb-5 max-w-md text-slate-600">
              Add some products from the home page to see them here.
            </p>
            <Link
              href="/?page=1#products"
              className="inline-flex rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Products
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
            <section className="grid gap-3">
              {items.map((item) => {
                const subtotal = item.price * item.quantity;

                return (
                  <article
                    key={item.id}
                    className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-950">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                          ${item.price.toFixed(2)} each · {item.stock} available
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">
                          Subtotal ${subtotal.toFixed(2)}
                        </p>
                      </div>

                      {/* Simple quantity controls for the prototype. */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity === 1}
                          className="h-10 w-10 rounded-md border border-stone-300 bg-white text-lg font-semibold text-slate-800 transition hover:bg-stone-100 disabled:bg-stone-50 disabled:text-stone-300"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          -
                        </button>

                        <span className="min-w-10 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          disabled={item.quantity >= item.stock}
                          className="h-10 w-10 rounded-md bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-stone-100 disabled:text-stone-400"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromBasket(item.id)}
                          className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-950">
                Basket Total
              </h2>
              <p className="text-3xl font-bold text-slate-950">
                ${basketTotal.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Continue to the payment page to choose a payment method.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/payment"
                  className="inline-flex rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Proceed to Payment
                </Link>

                <button
                  type="button"
                  onClick={handleClearBasket}
                  className="rounded-md border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Clear Basket
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </AccountGate>
  );
}
