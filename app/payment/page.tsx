"use client";

import Link from "next/link";
import { useState } from "react";
import AccountGate from "../components/account-gate";
import { useBasket } from "../context/basket-context";

const paymentMethods = [
  "Credit or Debit Card",
  "PayPal",
  "Bank Transfer",
  "Student Invoice",
];

export default function PaymentPage() {
  const { basketTotal, itemCount } = useBasket();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [message, setMessage] = useState("");

  function handlePaymentSelection() {
    // Prototype only: we save the selection in local state and do not
    // connect to any real payment provider.
    setMessage(
      `You selected ${selectedMethod}. This is a prototype, so no real payment will be processed.`,
    );
  }

  return (
    <AccountGate>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-8">
        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Payment Prototype
          </p>
          <h1 className="mb-3 text-3xl font-bold">Payment Page</h1>
          <p className="text-slate-800">
            This page is part of the prototype flow only. It lets the user pick
            a payment method, but it does not connect to any real payment
            system.
          </p>
        </section>

        {itemCount === 0 ? (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Basket is empty</h2>
            <p className="mb-4 text-slate-800">
              Add some items before going to the payment page.
            </p>
            <Link
              href="/basket"
              className="inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Back to Basket
            </Link>
          </section>
        ) : (
          <>
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <p className="text-slate-800">Items in basket: {itemCount}</p>
              <p className="mt-2 text-lg font-bold text-slate-950">
                Total: ${basketTotal.toFixed(2)}
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Choose Payment Method</h2>

              <div className="flex flex-col gap-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method}
                      checked={selectedMethod === method}
                      onChange={() => setSelectedMethod(method)}
                    />
                    <span className="text-slate-900">{method}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePaymentSelection}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                  Confirm Payment Method
                </button>

                <Link
                  href="/basket"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
                >
                  Back to Basket
                </Link>
              </div>

              {message ? (
                <p className="mt-4 text-sm font-medium text-green-700">
                  {message}
                </p>
              ) : null}
            </section>
          </>
        )}
      </main>
    </AccountGate>
  );
}
