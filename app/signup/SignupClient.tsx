"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupClient() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const sidebar = document.querySelector("aside") as HTMLElement | null;
    if (!sidebar) return;

    const previousDisplay = sidebar.style.display;
    sidebar.style.display = "none";

    return () => {
      sidebar.style.display = previousDisplay;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Premium Content */}
      <div className="relative hidden w-1/2 p-16 lg:flex lg:flex-col lg:justify-between bg-neutral-50">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-5xl font-light leading-tight tracking-tight text-neutral-900 mb-8">
            Join Akoustic Arts
          </h2>
          <p className="text-lg font-light text-neutral-600 max-w-md leading-relaxed mb-16">
            Professional audio scheduling and broadcasting, simplified for modern teams and venues.
          </p>

          {/* Features */}
          <div className="space-y-12">
            <div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
                Unified Control
              </div>
              <p className="text-sm text-neutral-600">
                Manage all your players, schedules, and broadcasts from one dashboard.
              </p>
            </div>

            <div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
                Real-time Monitoring
              </div>
              <p className="text-sm text-neutral-600">
                Live status and instant updates across your entire network.
              </p>
            </div>

            <div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
                Enterprise-ready
              </div>
              <p className="text-sm text-neutral-600">
                Built for professionals who demand reliability and performance.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-neutral-500">
          Already have an account? {" "}
          <Link href="/signin" className="text-neutral-900 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full items-center justify-center px-8 py-16 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <div className="relative h-6 w-6 overflow-hidden rounded">
                <Image
                  src="/akousticarts.webp"
                  alt="Akoustic Arts"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-light tracking-wide text-neutral-600">
                Akoustic Arts
              </span>
            </div>
            <h1 className="text-4xl font-light leading-tight text-neutral-900 mb-3">
              Create account
            </h1>
            <p className="text-sm text-neutral-600">
              Get started in seconds. All you need is an email.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-8 grid gap-3">
            <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-md text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-md text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 4.654 3.016 8.598 7.206 9.985.527.098.72-.229.72-.509 0-.252-.01-1.088-.015-1.973-2.932.637-3.553-1.256-3.553-1.256-.48-1.219-1.172-1.543-1.172-1.543-.958-.655.073-.642.073-.642 1.06.075 1.617 1.089 1.617 1.089.942 1.614 2.472 1.148 3.072.878.095-.683.369-1.149.671-1.413-2.341-.267-4.799-1.171-4.799-5.213 0-1.152.411-2.093 1.086-2.832-.109-.268-.47-1.347.103-2.809 0 0 .884-.283 2.9 1.082A10.084 10.084 0 0 1 12 6.06c.897.004 1.8.122 2.643.357 2.013-1.365 2.895-1.082 2.895-1.082.575 1.462.214 2.541.105 2.809.676.739 1.084 1.68 1.084 2.832 0 4.053-2.463 4.943-4.812 5.205.38.327.72.971.72 1.957 0 1.414-.013 2.553-.013 2.9 0 .282.19.612.727.508C19.49 20.594 22.5 16.652 22.5 12c0-5.799-4.701-10.5-10.5-10.5Z"
                />
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-neutral-500 text-xs font-medium">
                Or email
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-neutral-700 mb-2">
                  First name
                </label>
                <Input
                  id="firstName"
                  placeholder="Jane"
                  type="text"
                  className="text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-neutral-700 mb-2">
                  Last name
                </label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  type="text"
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-neutral-700 mb-2">
                Email address
              </label>
              <Input
                id="email"
                placeholder="jane@example.com"
                type="email"
                className="text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-neutral-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                className="text-sm"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Minimum 8 characters. Mix of uppercase, lowercase, and numbers recommended.
              </p>
            </div>

            <Button className="w-full mt-8 bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-medium py-2">
              Create account
            </Button>

            <p className="text-center text-xs text-neutral-600 mt-6">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-neutral-900 hover:underline">
                Terms of Service
              </Link>
              {" "}and{" "}
              <Link href="#" className="text-neutral-900 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
