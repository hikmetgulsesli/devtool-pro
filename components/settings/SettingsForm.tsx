'use client';

import { useState, useEffect } from 'react';
import {
  SystemSettings,
  DEFAULT_SETTINGS,
  CURRENCIES,
  DATE_FORMATS,
  TIMEZONES,
  LANGUAGES,
} from '@/lib/settings';

interface SettingsFormProps {
  initialSettings?: SystemSettings;
  onSave?: (settings: SystemSettings) => void;
}

export default function SettingsForm({ initialSettings, onSave }: SettingsFormProps) {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings || DEFAULT_SETTINGS);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleChange = (field: keyof SystemSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setSaveMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSave?.(settings);
      setIsDirty(false);
      setSaveMessage('Settings saved successfully!');
    } catch {
      setSaveMessage('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(initialSettings || DEFAULT_SETTINGS);
    setIsDirty(false);
    setSaveMessage(null);
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)]
    text-[var(--text-primary)] placeholder-[var(--text-muted)]
    focus:outline-none focus:border-[var(--neon-primary)] focus:ring-1 focus:ring-[var(--neon-primary)]
    transition-colors duration-200
  `;

  const selectClasses = `
    w-full px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)]
    text-[var(--text-primary)]
    focus:outline-none focus:border-[var(--neon-primary)] focus:ring-1 focus:ring-[var(--neon-primary)]
    transition-colors duration-200 appearance-none cursor-pointer
    bg-no-repeat bg-right-3
  `;

  const labelClasses = "block text-sm font-medium text-[var(--text-secondary)] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Company Information Section */}
      <section className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--neon-primary)]/10 flex items-center justify-center">
            <span className="text-xl">🏢</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold font-display">Company Information</h2>
            <p className="text-sm text-[var(--text-muted)]">Your organization details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="companyName" className={labelClasses}>
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={settings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className={inputClasses}
              placeholder="Enter company name"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="companyAddress" className={labelClasses}>
              Company Address
            </label>
            <textarea
              id="companyAddress"
              value={settings.companyAddress}
              onChange={(e) => handleChange('companyAddress', e.target.value)}
              className={`${inputClasses} min-h-[80px] resize-y`}
              placeholder="Enter company address"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="companyEmail" className={labelClasses}>
              Company Email
            </label>
            <input
              type="email"
              id="companyEmail"
              value={settings.companyEmail}
              onChange={(e) => handleChange('companyEmail', e.target.value)}
              className={inputClasses}
              placeholder="contact@company.com"
            />
          </div>

          <div>
            <label htmlFor="companyPhone" className={labelClasses}>
              Company Phone
            </label>
            <input
              type="tel"
              id="companyPhone"
              value={settings.companyPhone}
              onChange={(e) => handleChange('companyPhone', e.target.value)}
              className={inputClasses}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </section>

      {/* Regional Settings Section */}
      <section className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--neon-secondary)]/10 flex items-center justify-center">
            <span className="text-xl">🌍</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold font-display">Regional Settings</h2>
            <p className="text-sm text-[var(--text-muted)]">Localization and formatting preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="defaultCurrency" className={labelClasses}>
              Default Currency
            </label>
            <select
              id="defaultCurrency"
              value={settings.defaultCurrency}
              onChange={(e) => handleChange('defaultCurrency', e.target.value)}
              className={selectClasses}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: '20px',
                paddingRight: '40px',
              }}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateFormat" className={labelClasses}>
              Date Format
            </label>
            <select
              id="dateFormat"
              value={settings.dateFormat}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
              className={selectClasses}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: '20px',
                paddingRight: '40px',
              }}
            >
              {DATE_FORMATS.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className={labelClasses}>
              Timezone
            </label>
            <select
              id="timezone"
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className={selectClasses}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: '20px',
                paddingRight: '40px',
              }}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language" className={labelClasses}>
              Language
            </label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className={selectClasses}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: '20px',
                paddingRight: '40px',
              }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--neon-accent)]/10 flex items-center justify-center">
            <span className="text-xl">👁️</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold font-display">Preview</h2>
            <p className="text-sm text-[var(--text-muted)]">How your settings will appear</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-muted)]">Currency:</span>
            <span className="text-[var(--text-primary)]">
              {CURRENCIES.find((c) => c.value === settings.defaultCurrency)?.label}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-muted)]">Date Format:</span>
            <span className="text-[var(--text-primary)]">
              {DATE_FORMATS.find((f) => f.value === settings.dateFormat)?.label}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-muted)]">Timezone:</span>
            <span className="text-[var(--text-primary)]">
              {TIMEZONES.find((t) => t.value === settings.timezone)?.label.split(' (')[0]}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-muted)]">Language:</span>
            <span className="text-[var(--text-primary)]">
              {LANGUAGES.find((l) => l.value === settings.language)?.label}
            </span>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={!isDirty || isSaving}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${
                isDirty && !isSaving
                  ? 'bg-[var(--neon-primary)] text-[var(--bg-primary)] hover:shadow-[var(--shadow-neon)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed'
              }
            `}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={!isDirty || isSaving}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${
                isDirty && !isSaving
                  ? 'border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:border-[var(--neon-secondary)] hover:text-[var(--neon-secondary)]'
                  : 'border border-[var(--border-primary)] text-[var(--text-muted)] cursor-not-allowed'
              }
            `}
          >
            Reset
          </button>
        </div>

        {saveMessage && (
          <p
            className={`text-sm ${
              saveMessage.includes('successfully')
                ? 'text-[var(--neon-primary)]'
                : 'text-[var(--neon-accent)]'
            }`}
          >
            {saveMessage}
          </p>
        )}
      </div>
    </form>
  );
}
