import { useState, useMemo } from 'react';
import { VEHICLE_PRICE, calcHirePurchase, flatToReducingRate } from './calc';
import './Calculator.css';

const AED_TO_CNY = 1.89;

function fmtNum(n) {
  return n.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Calculator() {
  const [price, setPrice] = useState(VEHICLE_PRICE);
  const [downPct, setDownPct] = useState(25);
  const [rate, setRate] = useState(3.0);
  const [years, setYears] = useState(5);
  const [cny, setCny] = useState(false);

  const result = useMemo(() => {
    const p = price > 0 ? price : 0;
    const r = calcHirePurchase(p, downPct / 100, rate / 100, years);
    const reducingRate = flatToReducingRate(r.loanAmount, r.termMonths, r.monthlyPayment);
    return { ...r, reducingRate };
  }, [price, downPct, rate, years]);

  const amount = (aedValue) => fmtNum(cny ? aedValue * AED_TO_CNY : aedValue);
  const c = (aedValue) => cny
    ? <span className="num">&yen; {amount(aedValue)}</span>
    : <span className="num"><span className="dirham-sym">{'\u00ea'}</span> {amount(aedValue)}</span>;
  const cText = (aedValue) => `${cny ? '\u00a5' : 'Dh'} ${amount(aedValue)}`;

  return (
    <div className="app">
      <header className="header">
        <button className="currency-toggle" onClick={() => setCny(!cny)}>
          {cny ? <>&#x1F1E8;&#x1F1F3; &yen;</> : <>&#x1F1E6;&#x1F1EA; <span className="dirham-sym">{'\u00ea'}</span></>}
        </button>
        <h1>固定利率分期计算器</h1>
        <div className="price-input-row">
          <span className="price-label">总价：</span>
          <span className="dirham-sym price-sym">{'\u00ea'}</span>
          <input
            className="price-input"
            type="number"
            min="0"
            step="100"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
        </div>
        {cny && <p className="rate-hint">汇率：1 AED = {AED_TO_CNY} CNY（2026-02-08）</p>}
      </header>

      <div className="layout">
        <section className="inputs">
          <h2>贷款参数</h2>

          <div className="field">
            <label>
              首付比例：<strong className="num">{downPct}%</strong>
              <span className="field-val">{c(price * downPct / 100)}</span>
            </label>
            <input
              type="range" min="20" max="90" step="1"
              value={downPct}
              onChange={e => setDownPct(Number(e.target.value))}
            />
            <div className="range-labels"><span>20%</span><span>90%</span></div>
          </div>

          <div className="field">
            <label>
              年固定利率：<strong className="num">{rate.toFixed(1)}%</strong>
            </label>
            <input
              type="range" min="0" max="5" step="0.1"
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
            />
            <div className="range-labels"><span>0%</span><span>5%</span></div>
          </div>

          <div className="field">
            <label>
              贷款年数：<strong className="num">{years} 年</strong>
              <span className="field-val">共 <span className="num">{years * 12}</span> 个月</span>
            </label>
            <input
              type="range" min="1" max="5" step="1"
              value={years}
              onChange={e => setYears(Number(e.target.value))}
            />
            <div className="range-labels"><span>1 年</span><span>5 年</span></div>
          </div>
        </section>

        <section className="results">
          <h2>计算结果</h2>

          <div className="result-card highlight">
            <span className="result-label">每月月供</span>
            <span className="result-value">{c(result.monthlyPayment)}</span>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <span className="result-label">贷款金额</span>
              <span className="result-value">{c(result.loanAmount)}</span>
            </div>
            <div className="result-card">
              <span className="result-label">利息总额</span>
              <span className="result-value">{c(result.totalInterest)}</span>
            </div>
            <div className="result-card">
              <span className="result-label">还款总额</span>
              <span className="result-value">{c(result.totalRepayment)}</span>
            </div>
          </div>

          <div className="result-card info">
            <span className="result-label">等额本息折算实际年利率</span>
            <span className="result-value num">{(result.reducingRate * 100).toFixed(2)}%</span>
            <p className="note">
              固定利率 <span className="num">{rate.toFixed(1)}%</span> 折算为等额本息（递减余额法）后，实际年利率约为 <span className="num">{(result.reducingRate * 100).toFixed(2)}%</span>。
            </p>
          </div>

          <div className="breakdown">
            <h3>还款构成</h3>
            <div className="bar">
              <div
                className="bar-down"
                style={{ width: `${(result.downPayment / result.totalRepayment) * 100}%` }}
                title={`首付：${cText(result.downPayment)}`}
              />
              <div
                className="bar-loan"
                style={{ width: `${(result.loanAmount / result.totalRepayment) * 100}%` }}
                title={`本金：${cText(result.loanAmount)}`}
              />
              <div
                className="bar-interest"
                style={{ width: `${(result.totalInterest / result.totalRepayment) * 100}%` }}
                title={`利息：${cText(result.totalInterest)}`}
              />
            </div>
            <div className="bar-legend">
              <span><i className="dot dot-down" /> 首付</span>
              <span><i className="dot dot-loan" /> 本金</span>
              <span><i className="dot dot-interest" /> 利息</span>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
