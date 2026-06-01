"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountGate from "../components/account-gate";
import { useBasket } from "../context/basket-context";
import { useStudent } from "../context/student-context";

const paymentMethods = [
  "Credit or Debit Card",
  "PayPal",
  "Bank Transfer",
  "Student Invoice",
];

export default function PaymentPage() {
  const { basketTotal, clearBasket, itemCount, items } = useBasket();
  const { student } = useStudent();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handlePaymentSelection() {
    if (!student || items.length === 0) {
      return;
    }

    setIsSubmitting(true);

    const orderId = `357-${Date.now().toString().slice(-6)}`;
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      studentId: student.studentId,
      studentName: student.fullName,
      paymentMethod: selectedMethod,
      total: basketTotal,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    window.localStorage.setItem(
      `357-last-order:${student.studentId}`,
      JSON.stringify(order),
    );
    clearBasket();
    router.push(`/confirmation?order=${encodeURIComponent(orderId)}`);
  }

  return (
    <AccountGate>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-5 py-8 lg:px-6">
        <section className="border-b border-stone-200 pb-6">
          <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/?page=1#products">Shop</Link>
            <span>/</span>
            <Link href="/basket">Basket</Link>
            <span>/</span>
            <span className="font-semibold text-slate-950">Payment</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
            Payment
          </p>
          <h1 className="text-4xl font-bold text-slate-950">
            Choose Payment Method
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            This page is part of the prototype flow only. It lets the user pick
            a payment method, but it does not connect to any real payment
            system.
          </p>
        </section>

        {itemCount === 0 ? (
          <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-slate-950">
              Basket is empty
            </h2>
            <p className="mb-4 text-slate-600">
              Add some items before going to the payment page.
            </p>
            <Link
              href="/basket"
              className="inline-flex rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Basket
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-950">
                Order Summary
              </h2>
              <p className="text-sm text-slate-600">Items in basket</p>
              <p className="text-xl font-bold text-slate-950">{itemCount}</p>
              <div className="mt-4 grid gap-3 border-t border-stone-200 pt-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <span className="text-slate-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-slate-950">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">Total</p>
              <p className="text-3xl font-bold text-slate-950">
                ${basketTotal.toFixed(2)}
              </p>
            </section>

            <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-950">
                Payment Method
              </h2>

              <div className="flex flex-col gap-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 rounded-md border border-stone-200 p-4 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method}
                      checked={selectedMethod === method}
                      onChange={() => setSelectedMethod(method)}
                      className="h-4 w-4 accent-blue-600"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePaymentSelection}
                  disabled={isSubmitting}
                  className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-stone-200 disabled:text-stone-500"
                >
                  {isSubmitting ? "Creating Order..." : "Place Prototype Order"}
                </button>

                <Link
                  href="/basket"
                  className="rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-stone-100"
                >
                  Back to Basket
                </Link>
              </div>

              <p className="mt-4 rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                Prototype only: this creates a local confirmation record and
                does not process a real payment.
              </p>
            </section>
          </div>
        )}
      </main>
    </AccountGate>
  );
}
