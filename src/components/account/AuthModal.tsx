import React, { useState } from 'react';
import { X, Mail, ShieldCheck, KeyRound, ArrowRight, Lock, Key, AlertCircle, Sparkles } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { User } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  noticeMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, noticeMessage }) => {
  const [step, setStep] = useState<'email' | 'otp' | 'admin_password' | 'admin_secret_code'>('email');
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  if (!isOpen) return null;

  const handleResetModal = () => {
    setStep('email');
    setErrorMessage('');
    setInfoMessage('');
    setPasswordInput('');
    setSecretCodeInput('');
    setOtpInput('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    setTimeout(() => {
      const result = StorageService.checkEmailType(email.trim());
      setLoading(false);

      if (result.isLocked) {
        setErrorMessage(result.message || 'Account is temporarily locked.');
        return;
      }

      if (result.type === 'admin') {
        setStep('admin_password');
        setInfoMessage('Administrator Account Detected. Please enter password.');
      } else {
        // Customer or New Customer
        const otpRes = StorageService.sendOTP(email.trim());
        if (!otpRes.success) {
          setErrorMessage(otpRes.message);
          return;
        }
        if (otpRes.message) setInfoMessage(otpRes.message);
        setStep('otp');
      }
    }, 500);
  };

  const handleResendOTP = () => {
    if (!email.trim()) return;
    setLoading(true);
    setErrorMessage('');
    setInfoMessage('');
    setTimeout(() => {
      const otpRes = StorageService.sendOTP(email.trim());
      setLoading(false);
      if (!otpRes.success) {
        setErrorMessage(otpRes.message);
      } else {
        setInfoMessage(otpRes.message || `A fresh OTP code has been sent to ${email.trim()}`);
      }
    }, 400);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput.trim()) return;

    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const res = StorageService.verifyOTP(email.trim(), otpInput.trim());
      setLoading(false);

      if (!res.success || !res.user) {
        setErrorMessage(res.message || 'Invalid OTP code.');
        return;
      }

      onAuthSuccess(res.user);
      onClose();
    }, 600);
  };

  const handleVerifyAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const res = StorageService.verifyAdminPassword(email.trim(), passwordInput.trim());
      setLoading(false);

      if (!res.success) {
        setErrorMessage(res.message);
        return;
      }

      setStep('admin_secret_code');
      setInfoMessage('Password Verified. Please enter 6-Digit Secret Code.');
    }, 600);
  };

  const handleVerifyAdminSecretCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretCodeInput.trim()) return;

    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const res = StorageService.verifyAdminSecretCode(email.trim(), secretCodeInput.trim(), rememberMe);
      setLoading(false);

      if (!res.success || !res.user) {
        setErrorMessage(res.message);
        return;
      }

      onAuthSuccess(res.user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden font-sans">
        
        <button
          onClick={() => { handleResetModal(); onClose(); }}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
            ROYMEN CONCIERGE ACCESS
          </span>
          <h2 className="text-2xl font-black font-serif text-white uppercase tracking-wider">
            {step === 'email' && 'Client Sign In / Register'}
            {step === 'otp' && 'Enter 6-Digit OTP'}
            {step === 'admin_password' && 'Administrator Sign In'}
            {step === 'admin_secret_code' && 'Two-Factor Authorization'}
          </h2>
          <p className="text-xs text-zinc-400">
            {step === 'email' && 'Enter your email address to continue.'}
            {step === 'otp' && `Verification code dispatched to ${email}`}
            {step === 'admin_password' && 'Step 1 of 2: Enter administrator password.'}
            {step === 'admin_secret_code' && 'Step 2 of 2: Enter administrator 6-digit Secret Code.'}
          </p>
        </div>

        {infoMessage && (
          <div className="mb-4 p-3 bg-blue-950/60 border border-blue-800/80 rounded-xl text-blue-200 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="leading-relaxed">{infoMessage}</span>
          </div>
        )}

        {noticeMessage && (
          <div className="mb-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs flex items-center gap-2.5 shadow-sm">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold leading-relaxed">{noticeMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: EMAIL ADDRESS ENTRY */}
        {step === 'email' && (
          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. client@roymen.com.bd"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rem"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="accent-amber-400 rounded"
              />
              <label htmlFor="rem" className="text-xs text-zinc-400">
                Remember my session for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-amber-400 text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? 'Processing Account Check...' : <>Continue <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}

        {/* STEP 2: CUSTOMER OTP VERIFICATION */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-center space-y-1">
              <span className="text-xs text-zinc-300 block">
                An OTP verification code has been dispatched to <strong className="text-amber-400 font-mono">{email}</strong>.
              </span>
              <span className="text-[11px] text-zinc-500 block">Please check your email inbox and enter the 6-digit code below.</span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Enter OTP Code
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  placeholder="e.g. 123456"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest text-center text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg"
            >
              {loading ? 'Verifying...' : 'Verify & Enter ROYMEN'}
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Resend OTP Code
              </button>

              <button
                type="button"
                onClick={() => handleResetModal()}
                className="text-xs text-zinc-400 hover:text-white"
              >
                ← Change Email
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ADMIN PASSWORD ENTRY */}
        {step === 'admin_password' && (
          <form onSubmit={handleVerifyAdminPassword} className="space-y-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs">
              <span className="text-amber-300 font-medium">Administrator Email:</span>
              <strong className="text-white font-mono">{email}</strong>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                  Admin Password
                </label>
                <span className="text-[10px] text-zinc-500 font-mono">Demo: Admin123!</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying Password...' : <>Verify Password <ArrowRight className="w-4 h-4" /></>}
            </button>

            <button
              type="button"
              onClick={() => handleResetModal()}
              className="w-full text-center text-xs text-zinc-400 hover:text-white"
            >
              ← Change Email Address
            </button>
          </form>
        )}

        {/* STEP 4: ADMIN SECRET CODE ENTRY */}
        {step === 'admin_secret_code' && (
          <form onSubmit={handleVerifyAdminSecretCode} className="space-y-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs">
              <span className="text-amber-300 font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> 2-Step Auth
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Demo Code: 889900</span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Secret Authorization Code
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  maxLength={12}
                  required
                  value={secretCodeInput}
                  onChange={e => setSecretCodeInput(e.target.value)}
                  placeholder="e.g. 889900"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest text-center text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating Executive Session...' : <>Authorize & Launch Admin <ShieldCheck className="w-4 h-4" /></>}
            </button>

            <button
              type="button"
              onClick={() => { setStep('admin_password'); setErrorMessage(''); }}
              className="w-full text-center text-xs text-zinc-400 hover:text-white"
            >
              ← Back to Password Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

