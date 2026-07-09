import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg font-semibold text-paper">
            Cash<span className="text-signal">Score</span>
          </p>
          <p className="mt-1 text-sm text-mist">
            Built by Team Mentos — Garv Bansal &amp; Simran Rawat — for IDBI Innovate.
          </p>
        </div>
        <Link
          href="/demo"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition hover:border-signal hover:text-signal"
        >
          Try the live demo →
        </Link>
      </div>
    </footer>
  );
}
