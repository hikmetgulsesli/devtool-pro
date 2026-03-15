/**
 * Dashboard Layout with Navigation
 */

import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Navigation Header */}
      <nav className="border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold gradient-text font-display">
                Nakliye CRM
              </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--neon-primary)] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shipments"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--neon-primary)] transition-colors"
              >
                Shipments
              </Link>
              <Link
                href="/quotes"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--neon-primary)] transition-colors"
              >
                Quotes
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
