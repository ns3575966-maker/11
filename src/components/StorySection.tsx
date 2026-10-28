import React from 'react';
import { Sparkles, Heart, Coffee, ShieldCheck } from 'lucide-react';

export const StorySection: React.FC = () => {
  const milestones = [
    {
      year: '1964',
      title: 'First Café in Hamilton, Canada',
      description: 'Founded by NHL hockey legend Tim Horton. Built on the simple promise of serving fresh coffee and freshly baked donuts in a warm community atmosphere.',
    },
    {
      year: '2022',
      title: 'Tim Hortons Arrives in India',
      description: 'Opened its flagship store at Select CITYWALK, New Delhi, bringing Canada’s favorite coffee culture, iconic Timbits®, and locally crafted Indian beverages.',
    },
    {
      year: '2026',
      title: '35+ Cafés Across Major Indian Metros',
      description: 'Now serving handcrafted 100% Chikmagalur Arabica espresso, Nitro cold brews, and warm food in Delhi NCR, Mumbai, Bengaluru, Chandigarh, and Pune.',
    },
  ];

  return (
    <section id="story" className="py-20 bg-gradient-to-b from-[#120B09] via-[#1D1310] to-[#120B09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image & Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1D17] border border-[#FAF6EE]/15 text-xs text-[#E8C580]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>OUR BRAND STORY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EE] font-heading tracking-tight leading-tight text-balance">
              Crafting Joyful Coffee Moments Since 1964
            </h2>

            <p className="text-sm sm:text-base text-[#E0D0C1] leading-relaxed">
              From our origins in Canada to our bustling cafés in India, Tim Hortons has stood for warm hospitality, fresh ingredients, and coffee crafted with heart.
            </p>

            <div className="relative rounded-3xl overflow-hidden border border-[#FAF6EE]/15 shadow-2xl group">
              <img
                src="/src/assets/images/story_cafe_ambiance_1793198484099.jpg"
                alt="Tim Hortons Cafe Interior Concept"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120B09] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-2xl border border-[#FAF6EE]/10 flex items-center justify-between text-xs text-[#FAF6EE]">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#E8C580]" />
                  <div>
                    <div className="font-bold">100% Indian Arabica Beans</div>
                    <div className="text-[11px] text-[#E0D0C1]">Ethically Sourced in Chikmagalur</div>
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#C8102E]" />
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Timeline */}
          <div className="lg:col-span-6 space-y-8 pl-0 lg:pl-6">
            <h3 className="text-2xl font-bold text-[#FAF6EE] font-heading border-b border-[#FAF6EE]/10 pb-4">
              Key Milestones
            </h3>

            <div className="relative border-l-2 border-[#C8102E]/40 pl-6 space-y-8">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#120B09] border-2 border-[#C8102E] group-hover:bg-[#C8102E] transition-colors" />

                  <span className="text-xs font-bold font-mono tracking-widest text-[#E8C580] uppercase">
                    {m.year}
                  </span>

                  <h4 className="text-lg font-bold text-[#FAF6EE] font-heading mt-1">
                    {m.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#E0D0C1] mt-2 leading-relaxed">
                    {m.description}
                  </p>

                </div>
              ))}
            </div>

            <div className="p-5 glass-panel rounded-2xl border border-[#FAF6EE]/10 flex items-center gap-4 text-xs text-[#E0D0C1]">
              <Heart className="w-6 h-6 text-[#C8102E] shrink-0" />
              <p>
                Every cup served in our Indian cafés is roasted specifically to honor local coffee preferences while retaining Canada’s iconic smooth finish.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
