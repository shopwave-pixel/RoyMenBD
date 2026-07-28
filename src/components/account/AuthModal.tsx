import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, ShieldCheck, KeyRound, ArrowRight, Lock, Key, AlertCircle, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
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
  const [resendTimer, setResendTimer] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);

  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, resendTimer]);

  useEffect(() => {
    if (step === 'otp' && otpInputRef.current) {
      const timer = setTimeout(() => {
        otpInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleResetModal = () => {
    setStep('email');
    setErrorMessage('');
    setInfoMessage('');
    setPasswordInput('');
    setSecretCodeInput('');
    setOtpInput('');
    setIsSuccess(false);
    setResendTimer(60);
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
        setInfoMessage('');
      } else {
        // Customer or New Customer
        const otpRes = StorageService.sendOTP(email.trim());
        if (!otpRes.success) {
          setErrorMessage(otpRes.message);
          return;
        }
        setStep('otp');
        setResendTimer(60);
        setIsSuccess(false);
        setOtpInput('');
      }
    }, 500);
  };

  const handleResendOTP = () => {
    if (!email.trim() || resendTimer > 0 || loading) return;
    setLoading(true);
    setErrorMessage('');
    setOtpInput('');
    setTimeout(() => {
      const otpRes = StorageService.sendOTP(email.trim());
      setLoading(false);
      if (!otpRes.success) {
        setErrorMessage(otpRes.message);
      } else {
        setResendTimer(60);
      }
    }, 400);
  };

  const executeOTPVerification = (codeToVerify: string) => {
    if (!codeToVerify || codeToVerify.length !== 6 || loading || isSuccess) return;

    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const res = StorageService.verifyOTP(email.trim(), codeToVerify.trim());

      if (!res.success || !res.user) {
        setLoading(false);
        setErrorMessage(res.message || 'Invalid OTP code. Please try again.');
        return;
      }

      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onAuthSuccess(res.user!);
        onClose();
      }, 700);
    }, 500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    executeOTPVerification(otpInput);
  };

  const handleOtpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtpInput(digits);
    if (errorMessage) setErrorMessage('');
    if (digits.length === 6) {
      executeOTPVerification(digits);
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasteData) {
      setOtpInput(pasteData);
      if (errorMessage) setErrorMessage('');
      if (pasteData.length === 6) {
        executeOTPVerification(pasteData);
      }
    }
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
      setInfoMessage('');
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
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
            ROYMEN CONCIERGE ACCESS
          </span>
          <h2 className="text-2xl font-black font-serif text-white uppercase tracking-wider">
            {step === 'email' && 'Client Sign In / Register'}
            {step === 'otp' && 'ENTER 6-DIGIT OTP'}
            {step === 'admin_password' && 'ROYMEN ADMIN ACCESS'}
            {step === 'admin_secret_code' && 'TWO-FACTOR AUTHORIZATION'}
          </h2>
          <div className="text-xs text-zinc-400">
            {step === 'email' && 'Enter your email address to continue.'}
            {step === 'otp' && (
              <span>
                Verification code sent to{' '}
                <strong className="text-amber-400 font-mono block mt-0.5">{email}</strong>
              </span>
            )}
            {step === 'admin_password' && 'Enter your administrator credentials.'}
            {step === 'admin_secret_code' && 'Enter your secret authorization code.'}
          </div>
        </div>

        {infoMessage && step !== 'otp' && step !== 'admin_password' && step !== 'admin_secret_code' && (
          <div className="mb-4 p-3 bg-blue-950/60 border border-blue-800/80 rounded-xl text-blue-200 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="leading-relaxed">{infoMessage}</span>
          </div>
        )}

        {noticeMessage && step !== 'otp' && (
          <div className="mb-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs flex items-center gap-2.5 shadow-sm">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold leading-relaxed">{noticeMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
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
            {/* SINGLE MINIMALIST INFORMATION CARD */}
            <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-center space-y-2">
              <div className="w-9 h-9 mx-auto bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-400">
                <Mail className="w-4 h-4" />
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                We've sent a 6-digit verification code to your email address.
              </p>
              <p className="text-[11px] text-zinc-500">
                Please enter the code below to continue.
              </p>
            </div>

            {isSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span className="font-semibold">Verification Successful! Accessing Concierge...</span>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5 text-center">
                OTP INPUT
              </label>

              {/* SEGMENTED 6-DIGIT OTP BOX DISPLAY WITH FULL PASTE & AUTO-FOCUS SUPPORT */}
              <div className="relative my-2">
                <input
                  ref={otpInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otpInput}
                  onChange={handleOtpInputChange}
                  onPaste={handleOtpPaste}
                  disabled={loading || isSuccess}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer text-center font-mono text-lg"
                  autoComplete="one-time-code"
                />
                <div className="grid grid-cols-6 gap-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => {
                    const char = otpInput[idx] || '';
                    const isFocused = otpInput.length === idx || (idx === 5 && otpInput.length === 6);
                    return (
                      <div
                        key={idx}
                        className={`h-12 border rounded-xl flex items-center justify-center text-lg font-mono font-bold transition-all ${
                          char
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                            : isFocused
                            ? 'bg-zinc-900 border-amber-400 text-white ring-1 ring-amber-400/50'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-600'
                        }`}
                      >
                        {char ? char : '•'}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isSuccess || otpInput.length < 6}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  Verifying Code...
                </>
              ) : (
                'Verify & Enter ROYMEN'
              )}
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendTimer > 0 || loading || isSuccess}
                className="text-xs text-amber-400 disabled:text-zinc-500 hover:underline disabled:no-underline font-semibold transition-colors"
              >
                {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
              </button>

              <button
                type="button"
                onClick={() => handleResetModal()}
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                ← Change Email
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ADMIN PASSWORD ENTRY */}
        {step === 'admin_password' && (
          <form onSubmit={handleVerifyAdminPassword} className="space-y-5">
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-amber-400 font-semibold tracking-wide">Administrator Email</span>
              <strong className="text-white font-mono">{email}</strong>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Administrator Password
              </label>
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
              {loading ? 'Verifying Password...' : <>Access Admin Panel <ArrowRight className="w-4 h-4" /></>}
            </button>

            <button
              type="button"
              onClick={() => handleResetModal()}
              className="w-full text-center text-xs text-zinc-400 hover:text-white transition-colors"
            >
              ← Change Email Address
            </button>
          </form>
        )}

        {/* STEP 4: ADMIN SECRET CODE ENTRY */}
        {step === 'admin_secret_code' && (
          <form onSubmit={handleVerifyAdminSecretCode} className="space-y-5">
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-amber-400 font-semibold tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> 2-Step Authorization
              </span>
              <strong className="text-white font-mono">{email}</strong>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1.5 text-center">
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
                  placeholder="Enter secret authorization code"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest text-center text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating Session...' : <>Authorize & Launch Admin <ShieldCheck className="w-4 h-4" /></>}
            </button>

            <button
              type="button"
              onClick={() => { setStep('admin_password'); setErrorMessage(''); }}
              className="w-full text-center text-xs text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Password Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


