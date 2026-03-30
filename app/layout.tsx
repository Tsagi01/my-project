import type { Metadata } from "next";
import SiteHeader from "./components/site-header";
import { BasketProvider } from "./context/basket-context";
import { StudentProvider } from "./context/student-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "357 Ltd Ordering Prototype",
  description: "Simple product list prototype for 357 Ltd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StudentProvider>
          <BasketProvider>
            <SiteHeader />
            {children}
          </BasketProvider>
        </StudentProvider>
      </body>
    </html>
  );
}
