"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useSyncExternalStore } from "react";
import AccountGate from "../components/account-gate";
import { useStudent } from "../context/student-context";

type OrderRecord = {
  id: string;
  createdAt: string;
  studentId: string;
  studentName: string;
  paymentMethod: string;
  total: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
};

let cachedOrder: OrderRecord | null = null;
let cachedOrderKey = "";
let cachedOrderRawValue = "";

function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function subscribeToOrderChanges(listener: () => void) {
  window.addEventListener("storage", listener);

  return () => {
    window.removeEventListener("storage", listener);
  };
}

function getStoredOrder(studentId: string | undefined, requestedOrderId: string | null) {
  if (!studentId) {
    cachedOrder = null;
    cachedOrderKey = "";
    cachedOrderRawValue = "";
    return null;
  }

  const storageKey = `357-last-order:${studentId}`;
  const savedOrder = window.localStorage.getItem(storageKey);

  if (storageKey === cachedOrderKey && savedOrder === cachedOrderRawValue) {
    if (requestedOrderId && cachedOrder?.id !== requestedOrderId) {
      return null;
    }

    return cachedOrder;
  }

  cachedOrderKey = storageKey;
  cachedOrderRawValue = savedOrder ?? "";

  if (!savedOrder) {
    cachedOrder = null;
    return null;
  }

  try {
    const parsedOrder = JSON.parse(savedOrder) as OrderRecord;
    cachedOrder = parsedOrder;

    if (requestedOrderId && parsedOrder.id !== requestedOrderId) {
      return null;
    }

    return parsedOrder;
  } catch {
    window.localStorage.removeItem(storageKey);
    cachedOrder = null;
    cachedOrderRawValue = "";
    return null;
  }
}

function getServerOrderSnapshot() {
  return null;
}

function ConfirmationContent() {
  const { student } = useStudent();
  const searchParams = useSearchParams();
  const requestedOrderId = searchParams.get("order");
  const order = useSyncExternalStore(
    subscribeToOrderChanges,
    () => getStoredOrder(student?.studentId, requestedOrderId),
    getServerOrderSnapshot,
  );

  return (
    <AccountGate>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-5 py-8 lg:px-6">
        <section className="border-b border-stone-200 pb-6">
          <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/?page=1#products">Shop</Link>
            <span>/</span>
            <Link href="/basket">Basket</Link>
            <span>/</span>
            <Link href="/payment">Payment</Link>
            <span>/</span>
            <span className="font-semibold text-slate-950">Confirmation</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
            Order confirmation
          </p>
          <h1 className="text-4xl font-bold text-slate-950">
            Prototype Order Complete
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            This confirmation is saved locally in the browser for the signed-in
            student account.
          </p>
        </section>

        {!order ? (
          <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              No recent order found
            </h2>
            <p className="mt-2 text-slate-600">
              Place a prototype order from the basket to generate a confirmation
              here.
            </p>
            <Link
              href="/?page=1#products"
              className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Products
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-2 border-b border-stone-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Order {order.id}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {formatOrderDate(order.createdAt)}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                  Prototype saved
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {order.items.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col gap-2 rounded-md border border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-950">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        ${item.price.toFixed(2)} each · quantity {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-950">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <aside className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm lg:self-start">
              <h2 className="text-lg font-semibold text-slate-950">
                Confirmation Details
              </h2>
              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="text-slate-500">Student</dt>
                  <dd className="font-semibold text-slate-950">
                    {order.studentName}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Student ID</dt>
                  <dd className="font-semibold text-slate-950">
                    {order.studentId}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Payment method</dt>
                  <dd className="font-semibold text-slate-950">
                    {order.paymentMethod}
                  </dd>
                </div>
                <div className="border-t border-stone-200 pt-4">
                  <dt className="text-slate-500">Total</dt>
                  <dd className="text-3xl font-bold text-slate-950">
                    ${order.total.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <Link
                href="/?page=1#products"
                className="mt-5 inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
    </AccountGate>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-5 py-12 lg:px-6">
          <div className="w-full rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase text-blue-600">
              Loading confirmation
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950">
              Preparing order details
            </h1>
          </div>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
