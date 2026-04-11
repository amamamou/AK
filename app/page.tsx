import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-8 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6 overflow-hidden rounded">
            <Image
              src="/akousticarts.webp"
              alt="Akoustic Arts"
              fill
              sizes="24px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-sm font-light tracking-wide text-neutral-900">
            Akoustic Arts
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/signin"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-neutral-900 px-4 py-2 rounded-md hover:bg-neutral-100 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="w-full max-w-3xl">
          {/* Status Badge */}
          <div className="mb-12 flex">
            <span className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
              Coming Soon
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-8 text-6xl sm:text-7xl font-light leading-tight tracking-tight text-neutral-900">
            Your professional audio control center
          </h1>

          {/* Subheading */}
          <p className="mb-12 max-w-2xl text-lg font-light text-neutral-600 leading-relaxed">
            Manage players, orchestrate broadcasts, and schedule content across your network with one elegant, unified workspace. Built for professionals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-24">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors"
            >
              Enter Dashboard
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-neutral-900 border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-3 gap-16 pt-20 border-t border-neutral-200">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                Unified
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Manage all players, schedules, and broadcasts from a single dashboard.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                Real-time
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Live status monitoring and instant updates across your entire network.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                Professional
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Built for broadcasters, venues, and audio professionals who demand excellence.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-8 py-8">
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Akoustic Arts. Professional audio made simple.
        </p>
      </footer>
    </div>
  );
}
