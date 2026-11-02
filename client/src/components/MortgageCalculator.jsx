import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function MortgageCalculator({ basePrice = 2000000 }) {
  const [price, setPrice] = useState(basePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [tenorYears, setTenorYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(4.8);

  // Calculations
  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, price - downPayment);
  
  // Monthly financing calculation
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
    <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-[rgba(15,15,14,0.08)] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#F0EBE1] rounded-md border border-[rgba(15,15,14,0.06)] text-[#B8913A]">
            <Calculator size={18} />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-[#0F0F0E]">Capital & Yield Estimator</h3>
            <p className="text-[11px] text-[#6B6B5A] font-mono">Indicative Saudi Islamic Mortgage & Rental Model</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] text-[#B8913A]">
          Indicative Model
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sliders & Inputs */}
        <div className="space-y-4">
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#6B6B5A]">Acquisition Price</span>
              <span className="font-mono font-semibold text-[#B8913A]">SAR {price.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={8000000}
              step={100000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#B8913A] bg-[#E8E1D5] h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#6B6B5A]">Down Payment ({downPaymentPercent}%)</span>
              <span className="font-mono text-[#0F0F0E]">SAR {Math.round(downPayment).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={15}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#B8913A] bg-[#E8E1D5] h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#6B6B5A] mb-1">Term (Years)</label>
              <select
                value={tenorYears}
                onChange={(e) => setTenorYears(Number(e.target.value))}
                className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md py-1.5 px-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-[#6B6B5A] mb-1">Profit Rate (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                min="2.0"
                max="10.0"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md py-1.5 px-2.5 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="bg-[#F0EBE1] rounded-xl p-5 border border-[rgba(15,15,14,0.08)] flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="border-b border-[rgba(15,15,14,0.08)] pb-3">
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#6B6B5A]">Estimated Monthly Installment</p>
              <p className="text-2xl font-serif font-bold text-[#B8913A]">
                SAR {Math.round(monthlyPayment).toLocaleString()}
                <span className="text-xs font-sans text-[#6B6B5A] font-normal"> / month</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[10px] text-[#6B6B5A]">Loan Principal</p>
                <p className="font-mono text-[#0F0F0E]">SAR {Math.round(loanAmount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6B6B5A]">Equity Down Payment</p>
                <p className="font-mono text-[#0F0F0E]">SAR {Math.round(downPayment).toLocaleString()}</p>
              </div>
            </div>

            <div className="p-3 rounded bg-[#FAF7F2] border border-[rgba(15,15,14,0.06)] text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#6B6B5A]">Estimated Gross Rental:</span>
                <span className="font-mono text-[#0F0F0E]">~SAR {Math.round(estimatedMonthlyRent).toLocaleString()} /mo</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-[#6B6B5A]">Net Cashflow Variance:</span>
                <span className={`font-mono ${netMonthlyVariance >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {netMonthlyVariance >= 0 ? '+' : ''}SAR {Math.round(netMonthlyVariance).toLocaleString()} /mo
                </span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#8A8A75] leading-tight">
            *Indicative estimates based on standard bank criteria in Saudi Arabia. Subject to individual credit committee approval.
          </p>

        </div>

      </div>
    </div>
  );
}
