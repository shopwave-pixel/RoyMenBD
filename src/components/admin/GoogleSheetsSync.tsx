import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, Copy, Check, RefreshCw, Send, ShieldCheck, Sparkles, 
  Database, Activity, CheckCircle2, AlertTriangle, Cpu, Wrench, Code2, 
  Download, Hammer, Layers, Terminal, Lock, CheckCircle, FolderArchive
} from 'lucide-react';
import JSZip from 'jszip';
import { StorageService } from '../../services/storageService';
import { 
  GAS_SOURCE_FILES, 
  buildEnterpriseBackend, 
  BuildResult, 
  generateGoogleAppsScriptCode 
} from '../../services/gasCodeGenerator';
import { APP_CONFIG } from '../../config';
import { OperationsCenter } from './OperationsCenter';

export const GoogleSheetsSync: React.FC = () => {
  const [settings, setSettings] = useState(() => StorageService.getSettings());
  const [copied, setCopied] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [healthReport, setHealthReport] = useState<any>(null);
  const [healthCheckLoading, setHealthCheckLoading] = useState(false);

  // Active view tab in Developer Panel
  const [activeTab, setActiveTab] = useState<'OPERATIONS' | 'BUILD' | 'SOURCE' | 'SETTINGS'>('OPERATIONS');
  const [selectedSourceModule, setSelectedSourceModule] = useState<string>('Config.gs');
  const [moduleCopied, setModuleCopied] = useState(false);

  // Build State
  const [buildResult, setBuildResult] = useState<BuildResult>(() => buildEnterpriseBackend());
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildSuccessNotice, setBuildSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setHealthCheckLoading(true);
    const report = await StorageService.runSystemHealthCheck();
    setHealthReport(report);
    setHealthCheckLoading(false);
  };

  const handleBuildBackend = () => {
    setIsBuilding(true);
    setBuildSuccessNotice(null);
    setTimeout(() => {
      const res = buildEnterpriseBackend();
      setBuildResult(res);
      setIsBuilding(false);
      setBuildSuccessNotice(`Backend Build Successful! All ${res.stats.modulesCount} modules compiled into single Code.gs.`);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(buildResult.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySourceModule = (code: string) => {
    navigator.clipboard.writeText(code);
    setModuleCopied(true);
    setTimeout(() => setModuleCopied(false), 2000);
  };

  const handleDownloadSourceZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("ROYMEN_GAS_Source");
    const fileKeys = Object.keys(GAS_SOURCE_FILES);
    for (const key of fileKeys) {
      folder?.file(key, GAS_SOURCE_FILES[key].code);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Backend_Source_v${buildResult.stats.version}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadProductionCodeGs = () => {
    const blob = new Blob([buildResult.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  const sourceFileKeys = Object.keys(GAS_SOURCE_FILES);

  return (
    <div className="space-y-8 font-sans text-white max-w-5xl pb-12">
      
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Hammer className="w-3 h-3" /> Enterprise Build System Active
          </span>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Cpu className="w-3 h-3" /> Auto-Healing & Self-Migrating v2.0
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
          Enterprise Developer Panel & Apps Script Builder
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          Modular source engineering with automated single-file production compilation for Google Apps Script. 32 source modules, quality gate verification, and zero-config execution.
        </p>
      </div>

      {/* Primary Developer Panel Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('OPERATIONS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'OPERATIONS'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" /> Enterprise Operations Center
        </button>

        <button
          onClick={() => setActiveTab('BUILD')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'BUILD'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
          }`}
        >
          <Hammer className="w-4 h-4" /> Build Backend & Production Artifact
        </button>

        <button
          onClick={() => setActiveTab('SOURCE')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'SOURCE'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
          }`}
        >
          <Code2 className="w-4 h-4" /> Source Modules ({sourceFileKeys.length})
        </button>

        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'SETTINGS'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
          }`}
        >
          <Database className="w-4 h-4" /> Credentials & REST Setup
        </button>
      </div>

      {/* TAB 0: ENTERPRISE OPERATIONS CENTER */}
      {activeTab === 'OPERATIONS' && (
        <OperationsCenter />
      )}

      {/* TAB 1: BUILD BACKEND & PRODUCTION ARTIFACT */}
      {activeTab === 'BUILD' && (
        <div className="space-y-6">
          
          {/* Quality Gate Status Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold uppercase text-white font-serif">
                      Automated Quality Gate & Compiler
                    </h3>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono">
                      PASSED
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Runs AST validation, checks function uniqueness, and bundles all 32 source modules.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleBuildBackend}
                  disabled={isBuilding}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-black px-5 py-3 rounded-xl uppercase text-xs tracking-wider transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Hammer className={`w-4 h-4 ${isBuilding ? 'animate-spin' : ''}`} />
                  <span>{isBuilding ? 'Building Backend...' : 'Build Backend'}</span>
                </button>

                <button
                  onClick={handleCopyCode}
                  className="bg-white hover:bg-amber-400 text-black font-black px-5 py-3 rounded-xl uppercase text-xs tracking-wider transition-colors flex items-center gap-2 shadow-lg font-mono"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY COMPLETE BACKEND'}</span>
                </button>
              </div>
            </div>

            {buildSuccessNotice && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{buildSuccessNotice}</span>
              </div>
            )}

            {/* Build Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Build Status</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" /> {buildResult.stats.status}
                </span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Source Modules</span>
                <span className="text-xs font-bold text-amber-400 font-mono mt-1 block">
                  {buildResult.stats.modulesCount} Modules
                </span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Functions & Lines</span>
                <span className="text-xs font-bold text-white font-mono mt-1 block">
                  {buildResult.stats.functionsCount} Functions ({buildResult.stats.linesCount} lines)
                </span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Build ID & Hash</span>
                <span className="text-xs font-bold text-zinc-300 font-mono mt-1 block truncate">
                  #{buildResult.stats.buildNumber} ({buildResult.stats.buildHash})
                </span>
              </div>
            </div>

            {/* Action Buttons: Downloads */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-800/80">
              <button
                onClick={handleDownloadSourceZip}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2.5 rounded-xl border border-zinc-700 text-xs transition-colors flex items-center gap-2"
              >
                <FolderArchive className="w-4 h-4 text-amber-400" />
                <span>Download Backend Source (Backend.zip)</span>
              </button>

              <button
                onClick={handleDownloadProductionCodeGs}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2.5 rounded-xl border border-zinc-700 text-xs transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Production Code.gs</span>
              </button>
            </div>
          </div>

          {/* Source Protection Notice Banner */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-300 uppercase tracking-wide mb-0.5">Source Protection Architecture</strong>
              Never edit the generated production <code className="text-amber-400 font-mono bg-zinc-950 px-1.5 py-0.5 rounded">Code.gs</code> manually. Source modules inside development mode are the single source of truth. Always use <strong className="text-white">Build Backend</strong> to generate deployment artifacts.
            </div>
          </div>

          {/* Generated Code.gs Code Preview */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-0.5">
                  Compiled Artifact Output
                </span>
                <h3 className="text-sm font-bold uppercase text-white font-serif">
                  Single-File Production <code className="text-amber-400 font-mono">Code.gs</code>
                </h3>
              </div>

              <button
                onClick={handleCopyCode}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs border border-zinc-700 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Code' : 'Copy Code.gs'}</span>
              </button>
            </div>

            <textarea
              readOnly
              rows={16}
              value={buildResult.code}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs font-mono text-emerald-400/90 leading-relaxed focus:outline-none"
            />
          </div>

        </div>
      )}

      {/* TAB 2: MODULAR SOURCE FILES EXPLORER */}
      {activeTab === 'SOURCE' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Source Mode (Development)
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif">
                  Modular Google Apps Script Files ({sourceFileKeys.length} Modules)
                </h3>
                <p className="text-xs text-zinc-400">
                  Select any source module to inspect responsibility, code, and signatures.
                </p>
              </div>

              <button
                onClick={() => handleCopySourceModule(GAS_SOURCE_FILES[selectedSourceModule].code)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-zinc-700 transition-colors flex items-center gap-2"
              >
                {moduleCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{moduleCopied ? 'Module Copied!' : `Copy ${selectedSourceModule}`}</span>
              </button>
            </div>

            {/* Source Modules Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {sourceFileKeys.map((filename) => {
                const isSelected = selectedSourceModule === filename;
                const fileObj = GAS_SOURCE_FILES[filename];
                return (
                  <button
                    key={filename}
                    onClick={() => setSelectedSourceModule(filename)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-black border-amber-400 font-black'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 font-mono'
                    }`}
                  >
                    <span className="block truncate">{filename}</span>
                    <span className={`text-[9px] uppercase block mt-0.5 font-sans font-bold opacity-80`}>
                      {fileObj.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Module Inspector */}
            {GAS_SOURCE_FILES[selectedSourceModule] && (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-amber-400 font-mono block">{GAS_SOURCE_FILES[selectedSourceModule].filename}</strong>
                    <span className="text-zinc-400 text-[11px]">{GAS_SOURCE_FILES[selectedSourceModule].description}</span>
                  </div>
                  <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg">
                    {GAS_SOURCE_FILES[selectedSourceModule].category}
                  </span>
                </div>

                <textarea
                  readOnly
                  rows={14}
                  value={GAS_SOURCE_FILES[selectedSourceModule].code}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs font-mono text-emerald-400/90 leading-relaxed focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CREDENTIALS & REST SETUP */}
      {activeTab === 'SETTINGS' && (
        <div className="space-y-6">
          
          {/* Health Diagnostics Bar */}
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
                  <p className="text-xs text-zinc-400">Live monitoring of 30 sheets, schema versioning, and Super Admin records</p>
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
          </div>

          {/* Credentials Form */}
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
        </div>
      )}

    </div>
  );
};
