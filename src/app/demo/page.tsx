import Link from "next/link";
import LiveDemo from "@/components/demo/LiveDemo";

export default function DemoPage() {
  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <div className="glow-green pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full blur-3xl" />
      <div className="glow-blue pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full blur-3xl" />

      <div className="relative mx-auto mb-12 flex max-w-4xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_12px_theme(colors.signal)]" />
          <span className="font-display text-lg font-semibold text-paper">
            Cash<span className="text-signal">Score</span>
          </span>
        </Link>
        <Link href="/" className="text-sm text-mist transition hover:text-paper">
          ← Back home
        </Link>
      </div>

      <div className="relative">
        <LiveDemo />
      </div>
    </div>
  );
}
