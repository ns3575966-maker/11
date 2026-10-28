import React from 'react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-[#1D1310] border-b border-[#FAF6EE]/10 py-1.5 px-4 text-center text-xs text-[#E0D0C1]">
      <span className="font-semibold text-[#E8C580]">INDEPENDENT CONCEPT REDESIGN</span>
      <span className="mx-2 text-[#FAF6EE]/30">·</span>
      <span>Demonstration project only — not affiliated with or authorized by Tim Hortons.</span>
    </div>
  );
};
