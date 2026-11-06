import React, { useState } from 'react';

interface FbcLogoProps {
  variant?: 'white' | 'blue' | 'navy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
  className?: string;
}

export const FbcLogo: React.FC<FbcLogoProps> = ({
  size = 'md',
  showSubtext = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const heightClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24',
    xl: 'h-24 sm:h-28',
  }[size];

  const svgDimensions = {
    sm: { icon: 38, text: 'text-2xl' },
    md: { icon: 50, text: 'text-3xl' },
    lg: { icon: 70, text: 'text-5xl' },
    xl: { icon: 86, text: 'text-6xl' },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      {!imgError ? (
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-lg">
          <img
            src="/assets/aistudio/IMG-20261106-WA0006_9fd08494.jpg"
            alt="FBC Bank Zimbabwe Logo"
            className={`${heightClasses} w-auto object-contain transition-transform duration-200 hover:scale-[1.03] drop-shadow-xs`}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="inline-flex items-center gap-3">
          <div
            className="rounded-full border-2 border-white flex items-center justify-center shadow-sm"
            style={{ width: svgDimensions.icon, height: svgDimensions.icon }}
          >
            <svg viewBox="0 0 100 100" className="w-[82%] h-[82%] fill-white">
              <path d="M 50 12 C 30 12 14 28 14 48 C 14 62 23 74 36 80 C 26 73 22 62 25 51 C 29 38 42 34 54 31 C 67 28 80 23 80 12 Z"/>
              <path d="M 50 88 C 70 88 86 72 86 52 C 86 38 77 26 64 20 C 74 27 78 38 75 49 C 71 62 58 66 46 69 C 33 72 20 77 20 88 Z"/>
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>
          <span className={`font-serif font-extrabold tracking-wider text-white ${svgDimensions.text}`}>
            FBC
          </span>
        </div>
      )}
      {showSubtext && (
        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-white/90 mt-1">
          Bank &bull; You Matter Most
        </span>
      )}
    </div>
  );
};
