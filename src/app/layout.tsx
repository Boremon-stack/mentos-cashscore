import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
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
