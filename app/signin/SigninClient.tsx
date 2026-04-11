"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SigninClient() {
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
      {/* Left Section */}
      <div className="relative hidden w-1/2 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-16">
            <h2 className="text-5xl font-semibold leading-tight text-gray-900 mb-6">
              Welcome back
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              Sign in to your account to access your audio control center.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-sm text-gray-600">Secure authentication powered by industry-standard encryption</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-sm text-gray-600">
          Don&apos;t have an account? <Link href="/signup" className="font-semibold text-gray-900 hover:underline">Create one</Link>
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Sign in
            </h1>
            <p className="text-gray-600">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-8 grid gap-3">
            <Button variant="outline" className="h-11 rounded-lg border-gray-300 text-gray-900 hover:bg-gray-50">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
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
            </Button>
            <Button variant="outline" className="h-11 rounded-lg border-gray-300 text-gray-900 hover:bg-gray-50">
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 4.654 3.016 8.598 7.206 9.985.527.098.72-.229.72-.509 0-.252-.01-1.088-.015-1.973-2.932.637-3.553-1.256-3.553-1.256-.48-1.219-1.172-1.543-1.172-1.543-.958-.655.073-.642.073-.642 1.06.075 1.617 1.089 1.617 1.089.942 1.614 2.472 1.148 3.072.878.095-.683.369-1.149.671-1.413-2.341-.267-4.799-1.171-4.799-5.213 0-1.152.411-2.093 1.086-2.832-.109-.268-.47-1.347.103-2.809 0 0 .884-.283 2.9 1.082A10.084 10.084 0 0 1 12 6.06c.897.004 1.8.122 2.643.357 2.013-1.365 2.895-1.082 2.895-1.082.575 1.462.214 2.541.105 2.809.676.739 1.084 1.68 1.084 2.832 0 4.053-2.463 4.943-4.812 5.205.38.327.72.971.72 1.957 0 1.414-.013 2.553-.013 2.9 0 .282.19.612.727.508C19.49 20.594 22.5 16.652 22.5 12c0-5.799-4.701-10.5-10.5-10.5Z"
                  fill="currentColor"
                />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-600">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <Input
                id="email"
                placeholder="jane@example.com"
                type="email"
                className="h-11 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                className="h-11 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="remember" className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                />
                Remember me
              </label>
              <Link href="#" className="text-sm font-medium text-gray-900 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button className="h-11 w-full rounded-lg bg-gray-900 text-white hover:bg-gray-800">
              Sign in
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account? {" "}
              <Link
                href="/signup"
                className="font-semibold text-gray-900 hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
