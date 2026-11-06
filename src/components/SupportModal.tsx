import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, X, Clock, ShieldCheck } from 'lucide-react';
import { FbcLogo } from './FbcLogo';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 text-slate-800" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#004bbd] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FbcLogo variant="white" size="sm" />
            <div>
              <h3 className="font-bold text-lg leading-tight">FBC Help & Support</h3>
              <p className="text-blue-100 text-xs">24/7 Dedicated Client Contact Centre</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a href="tel:220" className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#004bbd] flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#004bbd]" />
              <div>
                <p className="text-slate-500 font-medium">Toll Free (All Networks)</p>
                <p className="text-base font-bold text-slate-800">220</p>
              </div>
            </a>
            <a href="https://wa.me/263772152612" target="_blank" rel="noreferrer" className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-slate-500 font-medium">WhatsApp Banking</p>
                <p className="text-sm font-bold text-slate-800">+263 77 215 2612</p>
              </div>
            </a>
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-start gap-3 text-slate-500">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-700">FBC Centre (Head Office)</p>
              <p>45 Nelson Mandela Avenue, P.O. Box 1227, Harare, Zimbabwe</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <p className="text-slate-500">&copy; 2026 FBC Holdings Limited.</p>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#004bbd] text-white font-semibold rounded-full hover:bg-[#003896]">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
