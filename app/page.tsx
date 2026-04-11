import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 py-8">
      <main className="w-full max-w-2xl px-6 sm:px-8">
        {/* Header */}
        <div className="mb-16 flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src="/akousticarts.webp"
              alt="Akoustic Arts"
              fill
              sizes="32px"
              className="object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">
              Akoustic Arts
            </p>
          </div>
        </div>

        {/* Main Content */}
        <section className="mb-16">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Coming soon
            </span>
          </div>

          <h1 className="mb-6 text-5xl sm:text-6xl font-semibold leading-tight tracking-tight text-gray-900">
            Your audio control center is on the way
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-600">
            Manage players, build schedules, monitor broadcasts, and control your account in one unified workspace. We&apos;re putting the final touches on it now.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/players"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Manage Players
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid sm:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">What you&apos;ll get</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              A unified dashboard for players, schedules, broadcasts, and analytics all in one place.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Current status</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Internal preview in progress. Your data is already live and synced across the platform.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Explore the beta</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Use the sidebar to explore Players, Schedule, and Settings while we finalize the experience.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
