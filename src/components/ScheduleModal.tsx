import React from 'react';
import { X, Printer } from 'lucide-react';
import { FbcLogo } from './FbcLogo';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  principal: number;
  periodMonths: number;
  annualInterestRate: number;
  currency: string;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  principal,
  periodMonths,
  annualInterestRate,
  currency,
}) => {
  if (!isOpen) return null;

  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, periodMonths))) / (Math.pow(1 + monthlyRate, periodMonths) - 1);

  let currentBalance = principal;
  const schedule = [];
  const today = new Date();

  for (let month = 1; month <= periodMonths; month++) {
    const interestPart = currentBalance * monthlyRate;
    const principalPart = monthlyPayment - interestPart;
    currentBalance = Math.max(0, currentBalance - principalPart);

    const paymentDate = new Date(today.getFullYear(), today.getMonth() + month, 1);
    schedule.push({
      month,
      date: paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      payment: monthlyPayment,
      principalPart,
      interestPart,
      remainingBalance: currentBalance,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
        <div className="bg-[#004bbd] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FbcLogo variant="white" size="sm" />
            <h3 className="font-bold text-base">Amortized Repayment Schedule (5.0% p.a.)</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="sticky top-0 bg-white border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-2">Month</th>
                <th className="py-2.5 px-2">Due Date</th>
                <th className="py-2.5 px-2 text-right">Payment</th>
                <th className="py-2.5 px-2 text-right">Principal</th>
                <th className="py-2.5 px-2 text-right">Interest (5%)</th>
                <th className="py-2.5 px-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedule.map((row) => (
                <tr key={row.month} className="hover:bg-blue-50/50">
                  <td className="py-2 px-2 font-medium">#{row.month}</td>
                  <td className="py-2 px-2">{row.date}</td>
                  <td className="py-2 px-2 text-right font-bold text-[#004bbd]">{currency} {row.payment.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right">{currency} {row.principalPart.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-amber-600">{currency} {row.interestPart.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right font-medium">{currency} {row.remainingBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <p className="text-slate-500">&copy; 2026 FBC Holdings Limited. All rights reserved.</p>
          <button onClick={() => window.print()} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 font-medium">
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>
    </div>
  );
};
