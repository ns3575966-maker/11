import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Flame, Eye, Sparkles } from 'lucide-react';

interface ControlOverlayProps {
  rotateSpeed: number;
  setRotateSpeed: (speed: number) => void;
  steamEnabled: boolean;
  setSteamEnabled: (enabled: boolean) => void;
  viewAngle: 'hero' | 'top' | 'front' | 'cinematic';
  setViewAngle: (angle: 'hero' | 'top' | 'front' | 'cinematic') => void;
}

export const ControlOverlay: React.FC<ControlOverlayProps> = ({
  rotateSpeed,
  setRotateSpeed,
  steamEnabled,
  setSteamEnabled,
  viewAngle,
  setViewAngle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-xl transition-all duration-300">
      {/* Collapse Toggle Handle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mx-auto mb-2 flex items-center gap-2 px-3 py-1 text-xs font-medium text-[#FAF6EE] bg-[#2A1D17]/80 hover:bg-[#C8102E] backdrop-blur-md border border-[#FAF6EE]/15 rounded-full shadow-lg transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E8C580]" />
        <span>{isCollapsed ? 'Show 3D Studio Controls' : 'Hide 3D Controls'}</span>
        {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Control Dock Panel */}
      {!isCollapsed && (
        <div className="glass-panel p-4 rounded-2xl shadow-2xl border border-[#FAF6EE]/15 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#E0D0C1]">
            {/* Rotation Speed Control */}
            <div className="flex items-center gap-2 bg-[#120B09]/60 px-3 py-1.5 rounded-lg border border-[#FAF6EE]/10">
              <RotateCcw className="w-3.5 h-3.5 text-[#E8C580]" />
              <span className="font-medium text-[#FAF6EE]">Spin Speed</span>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={rotateSpeed}
                onChange={(e) => setRotateSpeed(parseFloat(e.target.value))}
                className="w-16 accent-[#C8102E] cursor-pointer"
              />
            </div>

            {/* Steam Effect Toggle */}
            <button
              onClick={() => setSteamEnabled(!steamEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
                steamEnabled
                  ? 'bg-[#C8102E]/20 text-[#FAF6EE] border-[#C8102E]'
                  : 'bg-[#120B09]/60 text-[#E0D0C1] border-[#FAF6EE]/10 hover:border-[#FAF6EE]/30'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${steamEnabled ? 'text-[#C8102E]' : 'text-[#E0D0C1]'}`} />
              <span>Steam Effect: {steamEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Camera View Angle Pills */}
            <div className="flex items-center gap-1 bg-[#120B09]/60 p-1 rounded-lg border border-[#FAF6EE]/10">
              <Eye className="w-3.5 h-3.5 text-[#E8C580] ml-1.5 mr-0.5" />
              {(['hero', 'cinematic', 'front', 'top'] as const).map((angle) => (
                <button
                  key={angle}
                  onClick={() => setViewAngle(angle)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all capitalize ${
                    viewAngle === angle
                      ? 'bg-[#C8102E] text-white shadow-sm'
                      : 'text-[#E0D0C1] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {angle}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
