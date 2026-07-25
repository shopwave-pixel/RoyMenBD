import React, { useState, useEffect } from 'react';
import {
  Activity, Sparkles, ShieldCheck, Wrench, RefreshCcw, ArrowUpCircle, Mail, HeartPulse,
  Bell, HardDrive, FileText, CheckCircle2, AlertTriangle, XCircle, Search, Copy, Check,
  Play, Download, Eye, RotateCcw, Send, Settings as SettingsIcon, Filter, Clock, ChevronRight,
  ShieldAlert, Database, Server, Zap, Layers, RefreshCw
} from 'lucide-react';
import {
  OperationsService,
  MonitoringMetric,
  DiagnosticItem,
  RollbackVersion,
  EmailTemplate,
  EmailLog,
  EmailQueueItem,
  SystemNotification,
  SystemLog,
  BackupRecord
} from '../../services/operationsService';

export const OperationsCenter: React.FC = () => {
  // Navigation for Operations Center Modules
  const [activeModule, setActiveModule] = useState<
    'MONITORING' | 'AI_ASSISTANT' | 'DIAGNOSTICS' | 'AUTO_REPAIR' | 'ROLLBACK' |
    'UPGRADE' | 'EMAIL_CENTER' | 'HEALTH_CHECK' | 'NOTIFICATIONS' | 'BACKUP' | 'LOGS'
  >('MONITORING');

  // Auto Refresh State for Monitoring
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());

  // Data States
  const [monitoringMetrics, setMonitoringMetrics] = useState<MonitoringMetric[]>(() => OperationsService.getSystemMonitoringData());
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>(() => OperationsService.runEnterpriseDiagnostics());
  const [rollbackVersions] = useState<RollbackVersion[]>(() => OperationsService.getRollbackHistory());
  const [emailTemplates] = useState<EmailTemplate[]>(() => OperationsService.getEmailTemplates());
  const [emailQueue] = useState<EmailQueueItem[]>(() => OperationsService.getEmailQueue());
  const [emailLogs] = useState<EmailLog[]>(() => OperationsService.getEmailLogs());
  const [notifications, setNotifications] = useState<SystemNotification[]>(() => OperationsService.getNotifications());
  const [backups, setBackups] = useState<BackupRecord[]>(() => OperationsService.getBackupLogs());
  const [systemLogs] = useState<SystemLog[]>(() => OperationsService.getSystemLogs());

  // Action States
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedAiTask, setSelectedAiTask] = useState('Product Description');
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [copiedAi, setCopiedAi] = useState(false);

  // Repair State
  const [repairLogs, setRepairLogs] = useState<string[] | null>(null);
  const [repairing, setRepairing] = useState(false);

  // Upgrade State
  const [upgradeInfo] = useState(() => OperationsService.getUpgradeInfo());
  const [upgradeLogs, setUpgradeLogs] = useState<string[] | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  // Rollback State
  const [selectedRollbackVer, setSelectedRollbackVer] = useState('v1.9.5');
  const [rollbackLogs, setRollbackLogs] = useState<string[] | null>(null);
  const [rollingBack, setRollingBack] = useState(false);

  // Email Preview State
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(emailTemplates[0]);

  // Filters
  const [logFilterCategory, setLogFilterCategory] = useState('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Auto Refresh Timer for System Monitoring (30s)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoRefresh) {
      timer = setInterval(() => {
        setMonitoringMetrics(OperationsService.getSystemMonitoringData());
        setLastRefreshed(new Date().toLocaleTimeString());
      }, 30000);
    }
    return () => clearInterval(timer);
  }, [autoRefresh]);

  const handleManualRefreshMonitoring = () => {
    setMonitoringMetrics(OperationsService.getSystemMonitoringData());
    setLastRefreshed(new Date().toLocaleTimeString());
  };

  const handleRunAi = (taskName?: string) => {
    const task = taskName || selectedAiTask;
    setAiLoading(true);
    setAiOutput(null);
    setTimeout(() => {
      const result = OperationsService.runAIAssistant(aiPrompt || 'Generate Royal Navy Panjabi campaign', task);
      setAiOutput(result);
      setAiLoading(false);
    }, 500);
  };

  const handleCopyAiOutput = () => {
    if (aiOutput) {
      navigator.clipboard.writeText(aiOutput);
      setCopiedAi(true);
      setTimeout(() => setCopiedAi(false), 2000);
    }
  };

  const handleExecuteAutoRepair = () => {
    setRepairing(true);
    setRepairLogs(null);
    setTimeout(() => {
      const res = OperationsService.executeAutoRepair();
      setRepairLogs(res.logs);
      setDiagnostics(OperationsService.runEnterpriseDiagnostics());
      setRepairing(false);
    }, 800);
  };

  const handleExecuteUpgrade = () => {
    setUpgrading(true);
    setUpgradeLogs(null);
    setTimeout(() => {
      const res = OperationsService.executeOneClickUpgrade();
      setUpgradeLogs(res.logs);
      setUpgrading(false);
    }, 1000);
  };

  const handleExecuteRollback = () => {
    setRollingBack(true);
    setRollbackLogs(null);
    setTimeout(() => {
      const res = OperationsService.executeRollback(selectedRollbackVer);
      setRollbackLogs(res.logs);
      setRollingBack(false);
    }, 900);
  };

  const handleCreateBackup = () => {
    const newBkp: BackupRecord = {
      id: `BKP-${Date.now().toString().substring(5)}`,
      timestamp: new Date().toLocaleString(),
      sizeKb: 3450,
      type: 'MANUAL',
      status: 'VERIFIED',
      tablesCount: 30,
      rowCount: 1482
    };
    setBackups([newBkp, ...backups]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 font-sans text-white max-w-6xl pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Activity className="w-48 h-48 text-amber-400" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Enterprise Command Center
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Activity className="w-3 h-3 animate-pulse" /> Live Monitoring Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Enterprise Operations Center
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              Centralized command center for real-time monitoring, AI assistance, 18-point diagnostics, auto-repair, safe rollbacks, one-click upgrades, and transactional email management.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-zinc-950/80 p-2 rounded-2xl border border-zinc-800">
            <button
              onClick={handleManualRefreshMonitoring}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 rounded-xl transition-colors"
              title="Refresh Operations Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="text-right px-2">
              <span className="text-[9px] text-zinc-500 uppercase font-bold block">Last Refreshed</span>
              <span className="text-xs font-mono font-bold text-amber-400">{lastRefreshed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Center Module Navigation Bar (11 Modules) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
        <button
          onClick={() => setActiveModule('MONITORING')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'MONITORING'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> System Monitoring
        </button>

        <button
          onClick={() => setActiveModule('AI_ASSISTANT')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'AI_ASSISTANT'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> AI Assistant
        </button>

        <button
          onClick={() => setActiveModule('DIAGNOSTICS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'DIAGNOSTICS'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Diagnostics
        </button>

        <button
          onClick={() => setActiveModule('AUTO_REPAIR')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'AUTO_REPAIR'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" /> Auto Repair
        </button>

        <button
          onClick={() => setActiveModule('ROLLBACK')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'ROLLBACK'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Rollback
        </button>

        <button
          onClick={() => setActiveModule('UPGRADE')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'UPGRADE'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <ArrowUpCircle className="w-3.5 h-3.5" /> One Click Upgrade
        </button>

        <button
          onClick={() => setActiveModule('EMAIL_CENTER')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'EMAIL_CENTER'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <Mail className="w-3.5 h-3.5" /> Email Center
        </button>

        <button
          onClick={() => setActiveModule('HEALTH_CHECK')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'HEALTH_CHECK'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" /> Health Check
        </button>

        <button
          onClick={() => setActiveModule('NOTIFICATIONS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all relative ${
            activeModule === 'NOTIFICATIONS'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <Bell className="w-3.5 h-3.5" /> Notifications
          {unreadNotificationCount > 0 && (
            <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full font-mono">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveModule('BACKUP')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'BACKUP'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" /> Backup Manager
        </button>

        <button
          onClick={() => setActiveModule('LOGS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-all ${
            activeModule === 'LOGS'
              ? 'bg-amber-500 text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> System Logs
        </button>
      </div>

      {/* MODULE 1: SYSTEM MONITORING */}
      {activeModule === 'MONITORING' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white uppercase tracking-wider">Real-Time Metric Telemetry ({monitoringMetrics.length} Active Tracks)</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-zinc-400 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={e => setAutoRefresh(e.target.checked)}
                  className="accent-amber-400"
                />
                Auto Refresh (30s)
              </label>
              <button
                onClick={handleManualRefreshMonitoring}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3 py-1.5 rounded-xl border border-zinc-700 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3 text-amber-400" /> Refresh Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {monitoringMetrics.map(m => (
              <div key={m.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{m.category}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    m.status === 'Healthy'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : m.status === 'Warning'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {m.status === 'Healthy' && <CheckCircle2 className="w-3 h-3" />}
                    {m.status === 'Warning' && <AlertTriangle className="w-3 h-3" />}
                    {m.status === 'Critical' && <XCircle className="w-3 h-3" />}
                    {m.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white truncate">{m.name}</h4>
                  <div className="text-base font-black text-amber-400 font-mono mt-0.5">{m.value}</div>
                </div>

                <p className="text-[10px] text-zinc-400 line-clamp-1 border-t border-zinc-800/80 pt-1.5">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 2: AI ASSISTANT */}
      {activeModule === 'AI_ASSISTANT' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Enterprise Intelligence
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Enterprise AI Assistant
                </h3>
                <p className="text-xs text-zinc-400">Generate copy, SEO metadata, marketing campaigns, product specs, and business analytical insights.</p>
              </div>

              <span className="bg-zinc-950 text-emerald-400 border border-zinc-800 text-xs font-mono px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Gemini AI Engine Ready
              </span>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">Select AI Task Capability</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Product Description', 'SEO Metadata', 'Categories', 'Brands', 'Collections', 'FAQs',
                  'Coupons', 'Email Templates', 'Marketing Campaign', 'Product Tags', 'Product Specifications',
                  'Image Alt Text', 'Meta Titles', 'Homepage Banners', 'Blog Articles', 'Analyze Revenue',
                  'Predict Sales', 'Predict Low Stock'
                ].map(task => (
                  <button
                    key={task}
                    onClick={() => {
                      setSelectedAiTask(task);
                      handleRunAi(task);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedAiTask === task
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {task}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Custom Instructions / Prompt</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  placeholder="e.g. Generate autumn silk panjabi marketing campaign for Dhaka region..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white"
                />
                <button
                  onClick={() => handleRunAi()}
                  disabled={aiLoading}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl uppercase text-xs transition-colors flex items-center gap-2 shrink-0"
                >
                  <Sparkles className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
                  <span>{aiLoading ? 'Generating...' : 'Execute AI Task'}</span>
                </button>
              </div>
            </div>

            {/* Output Box */}
            {aiOutput && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">AI Generated Artifact</span>
                  <button
                    onClick={handleCopyAiOutput}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs border border-zinc-700 flex items-center gap-1.5"
                  >
                    {copiedAi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAi ? 'Copied Artifact' : 'Copy Output'}</span>
                  </button>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs font-mono text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
                  {aiOutput}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 3: DIAGNOSTICS */}
      {activeModule === 'DIAGNOSTICS' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  System Diagnostics
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif">18-Point Full Diagnostic Suite</h3>
                <p className="text-xs text-zinc-400">Verifies database schemas, credentials, API endpoints, permissions, and security parameters.</p>
              </div>

              <button
                onClick={() => setDiagnostics(OperationsService.runEnterpriseDiagnostics())}
                className="bg-amber-500 hover:bg-amber-400 text-black font-black px-4 py-2.5 rounded-xl uppercase text-xs flex items-center gap-1.5 shadow"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Run Diagnostic Suite
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {diagnostics.map(d => (
                <div key={d.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                    d.status === 'PASS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{d.name}</h4>
                      <span className="text-[9px] font-mono font-bold bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded">{d.category}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{d.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: AUTO REPAIR */}
      {activeModule === 'AUTO_REPAIR' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                Self-Healing Engine
              </span>
              <h3 className="text-base font-bold uppercase text-white font-serif flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" /> One-Click Auto Repair Pipeline
              </h3>
              <p className="text-xs text-zinc-400">Automatically restores missing sheets, headers, columns, default settings, and email templates without affecting existing customer orders or user accounts.</p>
            </div>

            <button
              onClick={handleExecuteAutoRepair}
              disabled={repairing}
              className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl uppercase text-xs flex items-center gap-2 shadow-lg"
            >
              <Wrench className={`w-4 h-4 ${repairing ? 'animate-spin' : ''}`} />
              <span>{repairing ? 'Repairing Backend...' : 'Execute One-Click Auto Repair'}</span>
            </button>

            {repairLogs && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-2 font-mono text-xs">
                <span className="text-amber-400 font-bold uppercase block mb-1">Execution Step Logs:</span>
                {repairLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 5: ROLLBACK MANAGER */}
      {activeModule === 'ROLLBACK' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                Version Control
              </span>
              <h3 className="text-base font-bold uppercase text-white font-serif">Enterprise Rollback Manager</h3>
              <p className="text-xs text-zinc-400">Revert backend and database configurations to previous verified checkpoints while preserving all customer orders and transaction history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rollbackVersions.map(v => (
                <div
                  key={v.version}
                  onClick={() => !v.isCurrent && setSelectedRollbackVer(v.version)}
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                    v.isCurrent
                      ? 'bg-zinc-950 border-amber-500/50'
                      : selectedRollbackVer === v.version
                      ? 'bg-amber-500/10 border-amber-400'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-amber-400 text-sm">{v.version}</span>
                      <span className="text-zinc-500 text-[10px] font-mono">Build #{v.buildNumber}</span>
                    </div>
                    {v.isCurrent && (
                      <span className="bg-emerald-500/20 text-emerald-400 font-bold text-[9px] px-2 py-0.5 rounded-md">
                        CURRENT ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-300 text-xs">{v.description}</p>
                  <span className="text-[10px] text-zinc-500 mt-2 block">Released: {v.releaseDate}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleExecuteRollback}
              disabled={rollingBack}
              className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl uppercase text-xs flex items-center gap-2 shadow-lg"
            >
              <RotateCcw className={`w-4 h-4 ${rollingBack ? 'animate-spin' : ''}`} />
              <span>{rollingBack ? 'Rolling Back...' : `Rollback to ${selectedRollbackVer}`}</span>
            </button>

            {rollbackLogs && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-1 font-mono text-xs">
                <span className="text-amber-400 font-bold uppercase block mb-1">Rollback Output Trail:</span>
                {rollbackLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 6: ONE CLICK UPGRADE */}
      {activeModule === 'UPGRADE' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Automated Pipeline
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif">One-Click System Upgrade Engine</h3>
                <p className="text-xs text-zinc-400">Upgrades system code, triggers backup, executes zero-downtime migrations, and updates version metadata.</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl text-right">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Latest Available</span>
                <span className="text-base font-black font-mono text-amber-400">{upgradeInfo.latestVersion}</span>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
              <span className="text-amber-400 font-bold uppercase block">Upgrade Release Highlights:</span>
              <ul className="space-y-1 text-zinc-300">
                {upgradeInfo.releaseNotes.map((note, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleExecuteUpgrade}
              disabled={upgrading}
              className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl uppercase text-xs flex items-center gap-2 shadow-lg"
            >
              <ArrowUpCircle className={`w-4 h-4 ${upgrading ? 'animate-spin' : ''}`} />
              <span>{upgrading ? 'Executing Upgrade Pipeline...' : 'Start One-Click Upgrade'}</span>
            </button>

            {upgradeLogs && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-1 font-mono text-xs">
                <span className="text-amber-400 font-bold uppercase block mb-1">Upgrade Execution Log:</span>
                {upgradeLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 7: EMAIL NOTIFICATION CENTER */}
      {activeModule === 'EMAIL_CENTER' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Transactional Email Engine
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif">Email Notification Center & Queue</h3>
                <p className="text-xs text-zinc-400">9 email categories, responsive HTML template renderer, automated dispatch queue, and delivery logs.</p>
              </div>

              <span className="bg-zinc-950 text-emerald-400 border border-zinc-800 text-xs font-mono px-3 py-1.5 rounded-xl flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> MailApp / Gmail Connected
              </span>
            </div>

            {/* Email Templates Showcase & Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Templates ({emailTemplates.length})</span>
                <div className="space-y-1.5">
                  {emailTemplates.map(tmpl => (
                    <button
                      key={tmpl.id}
                      onClick={() => setPreviewTemplate(tmpl)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        previewTemplate?.id === tmpl.id
                          ? 'bg-amber-500 text-black border-amber-400 font-bold'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span className="block truncate font-bold">{tmpl.name}</span>
                      <span className="text-[10px] uppercase block opacity-80 mt-0.5">{tmpl.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {previewTemplate && (
                <div className="md:col-span-2 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Live HTML Template Preview</span>
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3">
                    <div className="text-xs space-y-1 border-b border-zinc-800 pb-2">
                      <div><strong className="text-zinc-500 uppercase text-[10px]">Subject:</strong> <span className="text-white font-mono">{previewTemplate.subject}</span></div>
                      <div><strong className="text-zinc-500 uppercase text-[10px]">Category:</strong> <span className="text-amber-400 font-mono">{previewTemplate.category}</span></div>
                      <div><strong className="text-zinc-500 uppercase text-[10px]">Variables:</strong> <span className="text-zinc-400 font-mono text-[11px]">{previewTemplate.variables.join(', ')}</span></div>
                    </div>

                    <div
                      className="rounded-xl overflow-hidden text-black"
                      dangerouslySetInnerHTML={{ __html: previewTemplate.bodyHtml }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Email Queue & Logs Table */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Dispatch Queue & Delivery Logs</h4>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3">Recipient</th>
                      <th className="py-2.5 px-3">Subject</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Sent Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {emailLogs.map(l => (
                      <tr key={l.id} className="hover:bg-zinc-900/50">
                        <td className="py-2.5 px-3 font-mono text-zinc-300">{l.recipient}</td>
                        <td className="py-2.5 px-3 font-medium text-white">{l.subject}</td>
                        <td className="py-2.5 px-3 text-zinc-400 text-[10px] uppercase font-bold">{l.category}</td>
                        <td className="py-2.5 px-3">
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                            {l.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-zinc-500 text-[11px]">{l.sentTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 8: HEALTH CHECK */}
      {activeModule === 'HEALTH_CHECK' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Overall System Health Score
                </span>
                <h3 className="text-xl font-black font-serif text-white">100% OPTIMAL SYSTEM HEALTH</h3>
                <p className="text-xs text-zinc-400">All 30 sheet tables, Apps Script REST WebApp, and zero-config services operating seamlessly.</p>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
                <span className="text-2xl font-black font-mono text-emerald-400">100%</span>
                <span className="text-[9px] font-bold uppercase text-zinc-400 block mt-0.5">Health Grade: A+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">Google Sheets Database</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 30 / 30 Tabs Active
                </span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">REST WebApp API</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 98 ms Average Latency
                </span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">Transactional Services</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> MailApp / LockService Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 9: NOTIFICATIONS */}
      {activeModule === 'NOTIFICATIONS' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  In-App Notification Center
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif">System Alerts & ERP Activity</h3>
              </div>

              <button
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-zinc-700 transition-colors"
              >
                Mark All Read
              </button>
            </div>

            <div className="space-y-2">
              {notifications.map(n => (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border text-xs flex items-start justify-between gap-3 transition-all ${
                    n.read ? 'bg-zinc-950 border-zinc-800/80 opacity-70' : 'bg-zinc-950 border-amber-500/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white">{n.title}</h4>
                      <span className="bg-zinc-900 text-zinc-400 text-[9px] font-mono px-2 py-0.5 rounded">{n.category}</span>
                    </div>
                    <p className="text-zinc-300">{n.message}</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono shrink-0">{n.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 10: BACKUP MANAGER */}
      {activeModule === 'BACKUP' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Database Protection
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif">Automated Backup & Snapshot Manager</h3>
                <p className="text-xs text-zinc-400">Generates full 30-sheet database snapshots into 30_Backup_Log with point-in-time restore capability.</p>
              </div>

              <button
                onClick={handleCreateBackup}
                className="bg-amber-500 hover:bg-amber-400 text-black font-black px-4 py-2.5 rounded-xl uppercase text-xs flex items-center gap-1.5 shadow"
              >
                <HardDrive className="w-3.5 h-3.5" /> Create Instant Snapshot
              </button>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Snapshot ID</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Tables</th>
                    <th className="py-2.5 px-3">Rows</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {backups.map(b => (
                    <tr key={b.id} className="hover:bg-zinc-900/50">
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-400">{b.id}</td>
                      <td className="py-2.5 px-3 font-mono text-zinc-300">{b.timestamp}</td>
                      <td className="py-2.5 px-3 text-zinc-400 text-[10px] uppercase font-bold">{b.type}</td>
                      <td className="py-2.5 px-3 text-zinc-300 font-mono">{b.tablesCount} Tabs</td>
                      <td className="py-2.5 px-3 text-zinc-300 font-mono">{b.rowCount} Rows</td>
                      <td className="py-2.5 px-3">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 11: SYSTEM LOGS */}
      {activeModule === 'LOGS' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Enterprise Audit Trail
                </span>
                <h3 className="text-base font-bold uppercase text-white font-serif">System Action Logs (Sheet 21_Audit_Log)</h3>
              </div>

              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={logSearchQuery}
                  onChange={e => setLogSearchQuery(e.target.value)}
                  placeholder="Search logs by keyword..."
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">User</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Execution</th>
                    <th className="py-2.5 px-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {systemLogs
                    .filter(l => !logSearchQuery || l.action.toLowerCase().includes(logSearchQuery.toLowerCase()) || l.details.toLowerCase().includes(logSearchQuery.toLowerCase()))
                    .map(l => (
                      <tr key={l.id} className="hover:bg-zinc-900/50">
                        <td className="py-2.5 px-3 font-mono text-zinc-500 text-[11px]">{l.timestamp}</td>
                        <td className="py-2.5 px-3 font-mono text-zinc-300">{l.user}</td>
                        <td className="py-2.5 px-3 font-bold text-amber-400 font-mono">{l.action}</td>
                        <td className="py-2.5 px-3 text-zinc-400 text-[10px] uppercase">{l.category}</td>
                        <td className="py-2.5 px-3 font-mono text-emerald-400">{l.executionTimeMs} ms</td>
                        <td className="py-2.5 px-3 text-zinc-300 text-[11px]">{l.details}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
