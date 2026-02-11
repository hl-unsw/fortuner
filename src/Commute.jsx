import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Commute.css';

function fmt(n, dp = 0) {
  return n.toLocaleString('en', { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

export default function Commute() {
  const [cny, setCny] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [rateDate, setRateDate] = useState(null);
  const [rateError, setRateError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/rate', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setExchangeRate(data.rate);
        const d = new Date(data.timestamp);
        setRateDate(d.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }));
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setRateError('汇率获取失败，无法显示人民币金额');
        console.error('Failed to fetch exchange rate:', err);
      });
    return () => controller.abort();
  }, []);

  const aed = (v, dp = 0) => {
    if (cny) return `¥ ${fmt(Math.round(v * exchangeRate), 0)}`;
    return <><span className="dirham-sym">{'\u00ea'}</span> {fmt(v, dp)}</>;
  };

  const aedPerL = (v) => {
    if (cny) return `¥ ${fmt(v * exchangeRate, 2)}/L`;
    return <><span className="dirham-sym">{'\u00ea'}</span> {fmt(v, 2)}/L</>;
  };

  return (
    <div className="commute">
      <header className="commute-header">
        <Link to="/" className="back-link">&larr; 返回</Link>
        <button className="currency-toggle" onClick={() => {
          if (!cny && !exchangeRate) return;
          setCny(!cny);
        }} title={!cny && !exchangeRate ? '汇率获取失败，无法切换' : undefined}>
          <img src={cny ? 'https://flagcdn.com/cn.svg' : 'https://flagcdn.com/ae.svg'} alt={cny ? '中国' : 'UAE'} className="flag-icon" />
        </button>
        <h1>车辆通勤成本评估报告</h1>
        <p className="commute-subtitle">2026款 丰田 Fortuner 4.0L GXR 通勤成本分析</p>
        {cny && <p className="rate-hint">汇率：1 迪拉姆 = {exchangeRate} 人民币（{rateDate}）</p>}
        {!cny && rateError && <p className="rate-hint" style={{ color: '#e74c3c' }}>{rateError}</p>}
      </header>

      <div className="report-meta">
        <span><strong>报告日期：</strong>2026年2月11日</span>
        <span><strong>适用场景：</strong>阿布扎比夏季通勤 (Al Raha Beach &harr; Sky Tower, Al Reem Island)</span>
      </div>

      {/* Section 1 */}
      <section className="rpt-section">
        <h3>1. 基础参数设定</h3>

        <h4>1.1 车辆规格</h4>
        <table className="rpt-table">
          <tbody>
            <tr><td>车型</td><td>Toyota Fortuner 4.0L GXR (V6 4x4)</td></tr>
            <tr><td>发动机</td><td>4.0L V6 自然吸气 (1GR-FE)</td></tr>
            <tr><td>燃油标号</td><td>Special 95 (推荐)</td></tr>
            <tr><td>油箱容量</td><td>80 升</td></tr>
            <tr><td>官方标称油耗</td><td>9.6 km/L (约 10.4 L/100km)</td></tr>
          </tbody>
        </table>

        <h4>1.2 通勤路线</h4>
        <table className="rpt-table">
          <tbody>
            <tr><td>起点</td><td>Al Raha Beach</td></tr>
            <tr><td>终点</td><td>Sky Tower, Al Reem Island</td></tr>
            <tr><td>单程距离</td><td>28.7 km</td></tr>
            <tr><td>每日往返</td><td>57.4 km</td></tr>
            <tr><td>月通勤天数</td><td>22天 (按5天工作制计算)</td></tr>
            <tr className="row-highlight"><td>月总里程</td><td><strong>1,263 km</strong></td></tr>
          </tbody>
        </table>
      </section>

      {/* Section 2 */}
      <section className="rpt-section">
        <h3>2. 燃油成本测算 <span className="sec-note">夏季工况</span></h3>
        <p className="rpt-intro">
          由于阿布扎比夏季（7-9月）极端高温环境，本报告采用了比官方数据更为严谨的<strong>修正油耗模型</strong>。
        </p>

        <h4>2.1 油耗修正系数</h4>
        <ul className="rpt-list">
          <li><strong>空调负荷：</strong>夏季持续制冷导致发动机负载增加约 15%-20%。</li>
          <li><strong>路况损耗：</strong>考虑 E10 公路高峰期车流及进出岛拥堵。</li>
          <li><strong>修正后实际油耗：</strong><span className="val-highlight">6.8 km/L</span> (约 14.7 L/100km)</li>
        </ul>

        <h4>2.2 油价预估</h4>
        <ul className="rpt-list">
          <li><strong>基准油价：</strong><span className="val">{aedPerL(2.33)}</span> (2026年2月现价)</li>
          <li><strong>夏季波动预留：</strong><span className="val-highlight">{aedPerL(2.60)}</span> (为防止预算超支，采用夏季高位均价进行测算)</li>
        </ul>

        <h4>2.4 燃油费估算结果</h4>
        <div className="table-wrap">
          <table className="rpt-data-table">
            <thead>
              <tr>
                <th>场景</th>
                <th>预估油耗</th>
                <th>预估单价</th>
                <th>月总成本</th>
              </tr>
            </thead>
            <tbody>
              <tr className="row-primary">
                <td><strong>基准推荐 (严谨)</strong></td>
                <td><strong>6.8 km/L</strong></td>
                <td><strong>{aedPerL(2.60)}</strong></td>
                <td><strong>{aed(483)}</strong></td>
              </tr>
              <tr>
                <td>乐观情况 (路况顺畅)</td>
                <td>7.5 km/L</td>
                <td>{aedPerL(2.33)}</td>
                <td>{aed(392)}</td>
              </tr>
              <tr>
                <td>极端情况 (严重拥堵)</td>
                <td>6.0 km/L</td>
                <td>{aedPerL(2.70)}</td>
                <td>{aed(568)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3 */}
      <section className="rpt-section">
        <h3>3. 路桥费 (DARB Toll) 分析</h3>

        <h4>3.1 路线核查</h4>
        <ul className="rpt-list">
          <li><strong>主要路径：</strong>Sheikh Zayed Bin Sultan St (E10) &rarr; Um Yifeenah Street &rarr; Al Reem Island。</li>
          <li><strong>收费站判定：</strong>该路线利用 Um Yifeenah 隧道/桥梁直接入岛，<strong>不经过</strong> Sheikh Zayed Bridge 主桥收费门。</li>
        </ul>

        <h4>3.2 费用结论</h4>
        <ul className="rpt-list">
          <li><strong>标准通勤费用：</strong><span className="val-highlight">{aed(0)}</span></li>
          <li className="rpt-warning"><strong>风险提示：</strong>若导航错误引导至 Sheikh Zayed Bridge 主桥，高峰时段（07:00-09:00 及 15:00-19:00）将产生 {aed(4)}/次 的费用。</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="rpt-section rpt-conclusion">
        <h3>4. 综合结论与预算建议</h3>
        <p className="rpt-intro">
          基于科学严谨的测算，2026款 Toyota Fortuner 4.0L 在阿布扎比最热月份的通勤成本如下：
        </p>

        <div className="conclusion-grid">
          <div className="conclusion-card">
            <span className="conclusion-label">月度燃油预算</span>
            <span className="conclusion-value primary">{aed(485)}</span>
            <span className="conclusion-note">建议预留 {aed(500)} 以应对油价波动</span>
          </div>
          <div className="conclusion-card">
            <span className="conclusion-label">月度路桥费</span>
            <span className="conclusion-value">{aed(0)}</span>
            <span className="conclusion-note">需确保行驶 Um Yifeenah Street</span>
          </div>
          <div className="conclusion-card total">
            <span className="conclusion-label">总通勤成本</span>
            <span className="conclusion-value primary">~{aed(485)} / 月</span>
          </div>
        </div>
      </section>
    </div>
  );
}
