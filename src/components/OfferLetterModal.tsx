import React from 'react';
import { X, Printer } from 'lucide-react';
import { FbcLogo } from './FbcLogo';

interface OfferLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    fullName: string;
    nationalId: string;
    phoneNumber: string;
    amount: number;
    periodMonths: number;
    interestRate: number;
    monthlyInstallment: number;
    totalRepayment: number;
    applicationId: string;
    approvalDate: string;
    loanPurpose: string;
    currency: string;
  };
}

export const OfferLetterModal: React.FC<OfferLetterModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        <div className="no-print bg-[#004bbd] px-6 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FbcLogo variant="white" size="sm" />
            <span className="font-semibold text-sm">Official Loan Offer Facility Letter</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="px-3 py-1.5 bg-white text-[#004bbd] rounded-lg text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="p-1 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-xs">
          <div className="flex items-start justify-between border-b-2 border-[#004bbd] pb-5">
            <div>
              <FbcLogo variant="white" size="md" />
              <p className="text-slate-500 mt-2">FBC Bank Limited &bull; Consumer Credit Division</p>
              <p className="text-slate-500">FBC Centre, 45 Nelson Mandela Ave, Harare, Zimbabwe</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded-full">OFFICIAL SANCTION</span>
              <p className="font-mono font-semibold text-slate-700 mt-2">Ref: {data.applicationId}</p>
              <p className="text-slate-500">Date: {data.approvalDate}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-bold text-slate-900 text-sm">{data.fullName || 'Valued Applicant'}</p>
            <p className="text-slate-600">National ID: <span className="font-mono">{data.nationalId || 'N/A'}</span></p>
            <p className="text-slate-600">Registered Mobile: {data.phoneNumber || 'N/A'}</p>
            <p className="text-slate-600">Credit Purpose: {data.loanPurpose || 'General Financing'}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#004bbd] text-white px-4 py-2 font-semibold">APPROVED CREDIT SUMMARY</div>
            <div className="divide-y divide-slate-200">
              <div className="flex justify-between px-4 py-2.5">
                <span>Sanctioned Principal:</span>
                <span className="font-bold text-slate-900">{data.currency} {data.amount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 bg-blue-50/40">
                <span>Annual Interest Rate:</span>
                <span className="font-bold text-emerald-600">{data.interestRate.toFixed(2)}% p.a. (Fixed)</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span>Repayment Period:</span>
                <span className="font-bold text-slate-900">{data.periodMonths} Months</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 bg-blue-50/40">
                <span>Monthly Equated Installment:</span>
                <span className="font-bold text-[#004bbd]">{data.currency} {data.monthlyInstallment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span>Total Credit Payable:</span>
                <span className="font-bold text-slate-900">{data.currency} {data.totalRepayment.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="no-print bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <p>&copy; 2026 FBC Holdings Limited. All rights reserved.</p>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#004bbd] text-white font-semibold rounded-full hover:bg-[#003896]">Close</button>
        </div>
      </div>
    </div>
  );
};
