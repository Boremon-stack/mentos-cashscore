import type { Metadata } from "next";
import { Roboto_Slab, Manrope } from "next/font/google";
import "./globals.css";

// Bold slab serif, matching the reference palette card's headline type.
const display = Roboto_Slab({
  variable: "--font-display",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CashScore — Behavioral Credit Scoring | Mentos",
  description:
    "CashScore reads real cashflow behavior — UPI frequency, EMI regularity, salary consistency — to score creditworthiness beyond CIBIL. Built by Team Mentos for IDBI Innovate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink text-paper font-body antialiased">
        {children}
      </body>
    </html>
  );
}
