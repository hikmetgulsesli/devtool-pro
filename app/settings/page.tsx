import Link from 'next/link';
import SettingsForm from '@/components/settings/SettingsForm';
import { SystemSettings, DEFAULT_SETTINGS } from '@/lib/settings';

export const metadata = {
  title: 'System Settings - DevTool Pro',
  description: 'Configure global system settings including company info, currencies, and regional preferences',
};

// In a real app, this would fetch from a database or API
async function getSettings(): Promise<SystemSettings> {
  return DEFAULT_SETTINGS;
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <li>
              <Link
                href="/"
                className="hover:text-[var(--neon-primary)] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-[var(--border-secondary)]">/</span>
            </li>
            <li className="text-[var(--text-primary)]">Settings</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
            System Settings
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Manage your global configuration including company information,
            default currencies, date formats, and timezone settings.
          </p>
        </div>

        {/* Settings Form */}
        <SettingsForm initialSettings={settings} />
      </main>
    </div>
  );
}
