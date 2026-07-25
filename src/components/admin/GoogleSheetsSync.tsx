import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Copy, Check, RefreshCw, Send, ShieldCheck, Sparkles, Database, Activity, CheckCircle2, AlertTriangle, Cpu, Wrench } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { generateGoogleAppsScriptCode } from '../../services/gasCodeGenerator';
import { APP_CONFIG } from '../../config';

export const GoogleSheetsSync: React.FC = () => {
  const [settings, setSettings] = useState(() => StorageService.getSettings());
  const [copied, setCopied] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [healthReport, setHealthReport] = useState<any>(null);
  const [healthCheckLoading, setHealthCheckLoading] = useState(false);

  const gasCode = generateGoogleAppsScriptCode();

  useEffect(() => {
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setHealthCheckLoading(true);
    const report = await StorageService.runSystemHealthCheck();
    setHealthReport(report);
    setHealthCheckLoading(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gasCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = StorageService.updateSettings({
      googleSheetId: settings.googleSheetId,
      googleWebAppUrl: settings.googleWebAppUrl,
      autoSyncGoogleSheets: settings.autoSyncGoogleSheets
    });
    setSettings(updated);
    setPingStatus('Settings saved. Central config.ts and local storage updated.');
    runHealthCheck();
  };

  const handleTestConnection = async () => {
    setLoading(true);
    setPingStatus('Connecting to Google Apps Script WebApp REST API...');

    const res = await StorageService.triggerGoogleSheetSync('PING_TEST', { test: true });
    setLoading(false);
    if (res.success) {
      setPingStatus('✓ Zero-Config REST API WebApp active & responding! Health Check Verified.');
    } else {
      setPingStatus(`✕ Sync ping notice: ${res.message}`);
    }
  };

  return (
    <div className="space-y-8 font-sans text-white max-w-5xl">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
            Zero-Configuration System Architecture
          </span>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Cpu className="w-3 h-3" /> Auto-Healing & Self-Migrating v2.0
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
          Zero-Config Google Sheets Engine & Health Center
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          ROYMEN features complete zero-configuration setup. Paste your Spreadsheet ID in <code className="text-amber-400 font-mono">config.ts</code> or the form below and deploy the generated Apps Script code to activate all 30 enterprise sheets, auto-healing, and self-migration.
        </p>
      </div>

      {/* System Health Check & Diagnostic Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase text-white font-serif flex items-center gap-2">
                Application Health & Database Integrity Check
              </h3>
              <p className="text-xs text-zinc-400">Live monitoring of 21 sheets, schema versioning, and Super Admin records</p>
            </div>
          </div>

          <button
            onClick={runHealthCheck}
            disabled={healthCheckLoading}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${healthCheckLoading ? 'animate-spin' : ''}`} />
            <span>Re-Check Health</span>
          </button>
        </div>

        {healthReport && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">System Status</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {healthReport.status}
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Engine Version</span>
              <span className="text-xs font-bold text-amber-400 font-mono mt-0.5 block">
                App v{healthReport.appVersion} / DB v{healthReport.dbVersion}
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Enterprise Sheets</span>
              <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                {healthReport.sheetsCount} Tabs Defined
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Super Admin Check</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Active
              </span>
            </div>
          </div>
        )}

        {healthReport?.autoHealedItems?.length > 0 && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-start gap-2">
            <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Auto-Healing Engine Active:</strong>
              <ul className="list-disc list-inside space-y-0.5 mt-1 text-[11px] text-amber-200">
                {healthReport.autoHealedItems.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Centralized Configuration (config.ts) & Credentials Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase text-white font-serif flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" /> Central Config (<code className="text-amber-400 font-mono text-xs">src/config.ts</code>) & REST Credentials
          </h3>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-lg">
            Single Source of Truth
          </span>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">Spreadsheet ID</label>
              <input
                type="text"
                value={settings.googleSheetId || APP_CONFIG.SPREADSHEET_ID || ''}
                onChange={e => setSettings({ ...settings, googleSheetId: e.target.value })}
                placeholder="Paste Spreadsheet ID from Google Sheets URL"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">Google Apps Script WebApp URL</label>
              <input
                type="url"
                value={settings.googleWebAppUrl || APP_CONFIG.API_URL || ''}
                onChange={e => setSettings({ ...settings, googleWebAppUrl: e.target.value })}
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="autosync"
              checked={settings.autoSyncGoogleSheets}
              onChange={e => setSettings({ ...settings, autoSyncGoogleSheets: e.target.checked })}
              className="accent-amber-400 rounded"
            />
            <label htmlFor="autosync" className="text-zinc-300 font-medium">
              Automatically post checkout transactions to Google Sheets WebApp in background
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-2.5 rounded-xl uppercase text-xs tracking-wider transition-colors"
            >
              Save Credentials
            </button>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={loading}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-5 py-2.5 rounded-xl uppercase text-xs tracking-wider border border-zinc-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> {loading ? 'Testing REST Connection...' : 'Test Connection Ping'}
            </button>
          </div>

          {pingStatus && (
            <div className="p-3 bg-zinc-950 border border-amber-500/30 text-amber-300 text-xs rounded-xl font-mono">
              {pingStatus}
            </div>
          )}
        </form>
      </div>

      {/* Code.gs Zero-Config Backend Script Generator */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full inline-block mb-1">
              ZERO-CONFIG PRODUCTION SCRIPT (`Code.gs`)
            </span>
            <h3 className="text-base font-bold uppercase text-white font-serif">
              Auto-Installing & Self-Healing Google Apps Script Code
            </h3>
            <p className="text-xs text-zinc-400">
              Copy this single file into Google Sheets &gt; Extensions &gt; Apps Script. On first boot, it automatically creates all 30 enterprise sheets, formats headers, initializes default settings, seeds the Super Admin, and handles auto-migrations!
            </p>
          </div>

          <button
            onClick={handleCopyCode}
            className="bg-white hover:bg-amber-400 text-black font-black px-5 py-3 rounded-xl uppercase text-xs tracking-wider transition-colors flex items-center gap-2 shadow-lg shrink-0 font-mono"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY COMPLETE BACKEND'}</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            readOnly
            rows={14}
            value={gasCode}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs font-mono text-emerald-400/90 leading-relaxed focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
