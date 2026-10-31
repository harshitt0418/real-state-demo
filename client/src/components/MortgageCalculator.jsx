import React, { useState } from 'react';
import { Calculator, Percent, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export default function MortgageCalculator({ basePrice = 2000000 }) {
  const [price, setPrice] = useState(basePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [tenorYears, setTenorYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(4.8);

  // Calculations
  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, price - downPayment);
  
  // Monthly financing calculation (Standard amortized formula)
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = tenorYears * 12;
  const monthlyPayment =
    monthlyRate > 0 && numberOfPayments > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / (numberOfPayments || 1);

  // Estimated gross rental yield assumption for district (e.g. 7.2%)
  const estimatedAnnualRent = price * 0.072;
  const estimatedMonthlyRent = estimatedAnnualRent / 12;
  const netMonthlyVariance = estimatedMonthlyRent - monthlyPayment;

  return (
    <div className="bg-[#151A21] border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#0F1216] rounded-md border border-neutral-800 text-[#C5A265]">
            <Calculator size={18} />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-[#F3EFEA]">Capital & Yield Estimator</h3>
            <p className="text-[11px] text-stone-400 font-mono">Indicative Saudi Islamic Mortgage & Rental Model</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[#C5A265]">
          Indicative Model
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sliders & Inputs */}
        <div className="space-y-4">
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-stone-400">Acquisition Price</span>
              <span className="font-mono font-semibold text-[#C5A265]">SAR {price.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={8000000}
              step={100000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#C5A265] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-stone-400">Down Payment ({downPaymentPercent}%)</span>
              <span className="font-mono text-stone-200">SAR {Math.round(downPayment).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={15}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#C5A265] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-stone-400 mb-1">Term (Years)</label>
              <select
                value={tenorYears}
                onChange={(e) => setTenorYears(Number(e.target.value))}
                className="w-full bg-[#0F1216] border border-neutral-800 rounded-md py-1.5 px-2.5 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-stone-400 mb-1">Profit Rate (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                min="2.0"
                max="10.0"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full bg-[#0F1216] border border-neutral-800 rounded-md py-1.5 px-2.5 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="bg-[#0F1216] rounded-xl p-4 border border-neutral-800/80 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="border-b border-neutral-800/80 pb-3">
              <p className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Estimated Monthly Installment</p>
              <p className="text-2xl font-serif font-bold text-[#F3EFEA] text-[#C5A265]">
                SAR {Math.round(monthlyPayment).toLocaleString()}
                <span className="text-xs font-sans text-stone-400 font-normal"> / month</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[10px] text-stone-400">Loan Principal</p>
                <p className="font-mono text-stone-300">SAR {Math.round(loanAmount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400">Equity Down Payment</p>
                <p className="font-mono text-stone-300">SAR {Math.round(downPayment).toLocaleString()}</p>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#151A21] border border-neutral-800 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-400">Estimated Gross Rental:</span>
                <span className="font-mono text-stone-200">~SAR {Math.round(estimatedMonthlyRent).toLocaleString()} /mo</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-stone-400">Net Operational Cashflow:</span>
                <span className={`font-mono ${netMonthlyVariance >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {netMonthlyVariance >= 0 ? '+' : ''}SAR {Math.round(netMonthlyVariance).toLocaleString()} /mo
                </span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 leading-tight">
            *Indicative estimates based on standard bank criteria in Saudi Arabia. Subject to individual credit committee approval.
          </p>

        </div>

      </div>
    </div>
  );
}
