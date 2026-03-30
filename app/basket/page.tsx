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
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-8">
        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Basket Prototype
          </p>
          <h1 className="mb-3 text-3xl font-bold">Your Basket</h1>
          <p className="text-slate-800">
            This basket uses localStorage for prototype purposes, so your items
            stay in the browser even after a refresh.
          </p>
        </section>

        {items.length === 0 ? (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Basket is empty</h2>
            <p className="mb-4 text-slate-800">
              Add some products from the home page to see them here.
            </p>
            <Link
              href="/?page=1#products"
              className="inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Back to Products
            </Link>
          </section>
        ) : (
          <>
            <section className="grid gap-4">
              {items.map((item) => {
                const subtotal = item.price * item.quantity;

                return (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-sm text-slate-800">
                          Price: ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-slate-800">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          Subtotal: ${subtotal.toFixed(2)}
                        </p>
                        <p className="text-sm text-slate-800">
                          Available stock: {item.stock}
                        </p>
                      </div>

                      {/* Simple quantity controls for the prototype. */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity === 1}
                          className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300 disabled:text-slate-500"
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
                          className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-500"
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromBasket(item.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">Basket Total</h2>
              <p className="text-lg font-bold text-slate-950">
                ${basketTotal.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-slate-800">
                Continue to the payment page to choose a payment method.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/payment"
                  className="inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                  Proceed to Payment
                </Link>

                <button
                  type="button"
                  onClick={handleClearBasket}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Clear Basket
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </AccountGate>
  );
}
