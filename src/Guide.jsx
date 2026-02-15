import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Guide.css';

export default function Guide() {
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="guide">
      <header className="guide-header">
        <Link to="/" className="back-link">&larr; 返回</Link>
        <h1>展厅潜伏与锁定指南</h1>
        <p className="guide-subtitle">Airport Road Toyota Showroom &middot; 2026年2月15日</p>
      </header>

      <div className="guide-banner">
        <span className="banner-icon">&#x1F3AF;</span>
        <div>
          <strong>今日核心战略</strong>
          <p>只定车，锁优惠，绝不触碰金融审批（AECB）红线。</p>
        </div>
      </div>

      {/* 准备工作 */}
      <section className="guide-section">
        <h3>准备工作：出门前带上这些</h3>
        <ul className="guide-checklist">
          <li>
            <span className="check-icon">&#x1F4B3;</span>
            <div>
              <strong>Emirates ID 原件</strong>
              <p>仅用于建档和支付订金，<span className="danger">严禁</span>允许他们复印去查征信。</p>
            </div>
          </li>
          <li>
            <span className="check-icon">&#x1F4B3;</span>
            <div>
              <strong>信用卡</strong>
              <p>准备支付 AED 2,000 - 5,000 的订金。不要付现金，信用卡退款留痕更安全。</p>
            </div>
          </li>
          <li>
            <span className="check-icon">&#x1F4C4;</span>
            <div>
              <strong>护照/签证复印件</strong>
              <p>备用，证明 Expat 身份。</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Step 1 */}
      <section className="guide-section">
        <h3><span className="step-num">1</span>直奔目标，确认现车 <span className="sec-note">Inventory Check</span></h3>
        <p className="guide-intro">进入展厅后，销售会热情接待。你需要迅速掌握主动权。</p>

        <div className="guide-point">
          <h4>目标锁定</h4>
          <p>明确告诉销售你只要 <strong>2026款 Fortuner 4.0L GXR (AED 154,900)</strong>。</p>
        </div>

        <div className="guide-point warn">
          <h4>避坑防守</h4>
          <p>销售极大可能会用话术推销 2.7L（说现车多、更便宜）或者 VXR（说配置高）。<strong>坚定拒绝</strong>，只聊 4.0L GXR。</p>
        </div>

        <div className="guide-script">
          <span className="script-label">话术</span>
          <p className="script-en">"Do you have physical stock for 4.0L GXR right now, or when is the next shipment arriving?"</p>
          <p className="script-cn">现在有 4.0L GXR 的现车吗？如果没有，下一批船期是几号？</p>
        </div>

        <p className="guide-note"><strong>底线：</strong>如果现车要等超过 1 个月，需要重新评估。如果有在途车辆（In-transit），要求查看系统里的预计到港时间（ETA）。</p>
      </section>

      {/* Step 2 */}
      <section className="guide-section">
        <h3><span className="step-num">2</span>逼出斋月底牌 <span className="sec-note">Uncover the Real Ramadan Deals</span></h3>
        <p className="guide-intro">斋月即将在几天后（18号左右）开始，展厅的系统里其实已经有了 early-bird（早鸟）政策。</p>

        <div className="guide-script">
          <span className="script-label">利率优惠</span>
          <p className="script-cn">问清楚现在的 Campaign 是什么？是 0.99% 还是 1.99%？是 Flat Rate（平息）吗？</p>
        </div>
        <div className="guide-script">
          <span className="script-label">保险</span>
          <p className="script-en">"Is comprehensive insurance included for the first year?"</p>
          <p className="script-cn">送第一年的全险吗？省下保险就等于省下 3000+ 现金。</p>
        </div>
        <div className="guide-script">
          <span className="script-label">保养套餐</span>
          <p className="script-cn">标配通常是 2年/4万公里，<strong>强烈要求</strong>争取到 4年/8万公里 或 3年/6万公里。</p>
        </div>
        <div className="guide-script">
          <span className="script-label">隐藏费用</span>
          <p className="script-cn">问清楚除了车价，还有没有 Processing Fee (手续费) 或 Admin Fee？</p>
        </div>
      </section>

      {/* Step 3 */}
      <section className="guide-section">
        <h3><span className="step-num">3</span>会见金融经理，亮明底牌 <span className="sec-note">The F&I Strategy</span></h3>
        <p className="guide-intro">不要只跟普通销售聊，要求跟展厅的 <strong>Finance & Insurance (F&I) Manager</strong> 直接谈。这是今天最关键的交锋。</p>

        <div className="guide-script">
          <span className="script-label">自报家门</span>
          <p className="script-cn">"我的月薪是 3万 AED（IT行业，在 Sky Tower 办公），准备付 20%（3.1万 AED）首付，打算贷 4 年期。"</p>
        </div>
        <div className="guide-script bomb">
          <span className="script-label">抛出炸弹</span>
          <p className="script-cn">"但我目前在 Probation（试用期），只有 2 次工资流水。<strong>第 3 次流水会在 2 月 25 日到账。</strong>"</p>
        </div>

        <div className="guide-point">
          <h4>观察反应</h4>
          <p>听听 F&I 经理怎么说。专业的经理会告诉你："没问题，我们有 Al-Futtaim 内部渠道（或特定合作银行），等你 25 号流水一到，我们走特批。"</p>
        </div>

        <div className="guide-point danger-box">
          <h4>红线警告</h4>
          <p>如果他让你<strong>今天</strong>就填表申请试试看，<span className="danger">立刻拒绝</span>。告诉他：</p>
          <p className="script-en" style={{ marginTop: '0.5rem' }}>"I will not sign any finance application or authorize an AECB check until Feb 26th."</p>
          <p className="script-cn">在2月26日之前，我不会签任何金融申请，也不授权查征信。</p>
        </div>
      </section>

      {/* Step 4 */}
      <section className="guide-section">
        <h3><span className="step-num">4</span>下订金，签"对赌"协议 <span className="sec-note">The Safe Booking</span></h3>
        <p className="guide-intro">如果现车颜色合适，且 F&I 经理承诺 25 号之后能搞定 4 年期贷款，你可以刷卡支付订金（Booking Deposit），锁住这台车和今天的斋月优惠。</p>

        <div className="guide-point">
          <h4>必须拿到的文件</h4>
          <ul className="rpt-list">
            <li>拿到 <strong>Quotation（官方报价单）</strong>，上面必须清晰列出：车价 154,900、首付金额、承诺的利率、赠送的保险和保养。</li>
            <li>拿到 <strong>Receipt（订金收据）</strong>。</li>
          </ul>
        </div>

        <div className="guide-point danger-box">
          <h4>免责条款（极其重要！）</h4>
          <p>必须让销售或经理在收据或报价单上写下这句话并签字盖章：</p>
          <blockquote className="guide-quote">
            "Booking deposit is fully refundable if the 4-year auto finance is rejected due to the customer's probation status or insufficient bank statements."
          </blockquote>
          <p className="script-cn">如果因为客户处于试用期或银行流水不足导致4年期贷款被拒，订金全额退还。</p>
          <p className="guide-note" style={{ marginTop: '0.5rem' }}>有了这句话，你进可攻（稳拿车和优惠），退可守（贷款下不来全额退款）。</p>
        </div>
      </section>

      {/* Step 5 */}
      <section className="guide-section">
        <h3><span className="step-num">5</span>拿走文件清单 <span className="sec-note">Document Checklist</span></h3>
        <p className="guide-intro">离开前，向 F&I 经理要一份明确的清单。</p>

        <div className="guide-script">
          <span className="script-label">话术</span>
          <p className="script-en">"What exact documents do you need from me on Feb 26th?"</p>
          <p className="script-cn">2月26号那天，你需要我提供哪些具体文件？</p>
        </div>

        <p className="guide-intro">通常包括：</p>
        <ul className="rpt-list">
          <li>护照、Visa、Emirates ID 扫描件</li>
          <li>带 3 次工资的 Bank Statement（必须盖章或银行App官方导出）</li>
          <li>抬头开给对应银行的 Salary Certificate</li>
        </ul>
      </section>

      {/* Summary */}
      <section className="guide-section guide-summary">
        <h3>总结你的今天</h3>
        <p className="summary-text">
          你今天下午去机场路丰田，<strong>不是去买车的，而是去"谈判并占位"的</strong>。
        </p>
        <p className="summary-text">
          刷几千块钱的订金，买下这台 Fortuner 的优先权和斋月的早鸟优惠，然后潇洒离开。接下来的 10 天，你只需要安心上班，等 25 号发工资，随后一击必中。
        </p>
        <p className="summary-wish">祝您下午一切顺利！</p>
      </section>

      {/* Flat Rate explainer */}
      <section className="guide-section guide-note-section">
        <button className="note-toggle" onClick={() => setShowNote(!showNote)}>
          <h3>
            <span className="note-icon">{showNote ? '▾' : '▸'}</span>
            附注：Flat Rate（平息）利率陷阱详解
          </h3>
        </button>

        {showNote && (
          <div className="note-content">
            <p className="guide-intro">
              在阿联酋买车，销售和银行广告牌上打出的超低利率，99% 都是 <strong>Flat Rate（平息）</strong>。
              简单来说：平息是指在整个贷款周期内，银行始终按照你<strong>"最初借的本金总额"</strong>来计算利息，完全不考虑你已经还掉的本金。
            </p>

            <h4>1. Flat Rate 是怎么算的？</h4>
            <p className="guide-intro">假设贷款 100,000 迪拉姆，利率 2% (Flat Rate)，分 4 年还清：</p>
            <div className="formula-card">
              <p>总利息 = 本金 &times; 利率 &times; 年数</p>
              <p className="formula-result">= 100,000 &times; 2% &times; 4 = <strong>8,000 迪拉姆</strong></p>
            </div>
            <p className="guide-intro">
              <strong>魔鬼在细节里：</strong>到了贷款的第 4 年，你明明已经还了 7 万多本金，实际只欠银行不到 3 万迪拉姆了。但是，你在第 4 年支付的利息，依然是按照最初借的 100,000 迪拉姆的 2% 来收取的。你一直在为已经还给银行的钱支付利息。
            </p>

            <h4>2. 对比：Reducing Rate（递减利率）</h4>
            <p className="guide-intro">
              这是房贷的计算逻辑。利息只根据你<strong>当前还欠银行多少钱</strong>来算。
              随着你每个月还款，欠的本金越来越少，下个月产生的利息也就越来越少。你从不为已经还掉的钱付利息。
            </p>

            <h4>3. 为什么车行都爱用 Flat Rate？</h4>
            <p className="guide-intro">纯粹是为了<strong>营销包装，降低视觉门槛</strong>。金融界有一个粗略的真实成本换算公式：</p>
            <div className="formula-card">
              <p>实际年化利率 (Reducing Rate) &asymp; Flat Rate &times; 1.85</p>
            </div>
            <table className="rpt-data-table" style={{ marginTop: '0.75rem' }}>
              <thead>
                <tr>
                  <th>Flat Rate</th>
                  <th>实际年化</th>
                  <th>观感</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.99%</td>
                  <td><strong>~3.7%</strong></td>
                  <td>看似白菜价</td>
                </tr>
                <tr>
                  <td>3.50%</td>
                  <td><strong>~6.5%</strong></td>
                  <td>实际成本翻倍</td>
                </tr>
              </tbody>
            </table>

            <h4>4. 今天下午的实战用法</h4>
            <div className="guide-script">
              <span className="script-label">第一招</span>
              <p className="script-en">"Is this 1.99% flat or reducing?"</p>
              <p className="script-cn">这句话会立刻向经理传递明确信号：你是一个懂行、懂金融的买家 (Savvy buyer)，不好忽悠。</p>
            </div>
            <div className="guide-script">
              <span className="script-label">杀手锏</span>
              <p className="script-en">"What is the exact Total Interest Amount I will pay over 4 years?"</p>
              <p className="script-cn">抛开百分比的障眼法，直接看最终的绝对金额（Total Interest），才是评估方案划不划算的唯一真理。</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
