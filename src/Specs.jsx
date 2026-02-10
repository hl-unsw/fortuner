import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Specs.css';

function fmtPrice(n) {
  return n.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function Specs() {
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

  const price = (aed) => {
    if (cny) return `¥ ${fmtPrice(Math.round(aed * exchangeRate))}`;
    return <><span className="dirham-sym">{'\u00ea'}</span> {fmtPrice(aed)}</>;
  };

  return (
    <div className="specs">
      <header className="specs-header">
        <Link to="/" className="back-link">&larr; 返回</Link>
        <button className="currency-toggle" onClick={() => {
          if (!cny && !exchangeRate) return;
          setCny(!cny);
        }} title={!cny && !exchangeRate ? '汇率获取失败，无法切换' : undefined}>
          <img src={cny ? 'https://flagcdn.com/cn.svg' : 'https://flagcdn.com/ae.svg'} alt={cny ? '中国' : 'UAE'} className="flag-icon" />
        </button>
        <h1>配置信息</h1>
        <h2 className="specs-subtitle">2026款 丰田 FORTUNER — 4.0L GXR</h2>
        {cny && <p className="rate-hint">汇率：1 迪拉姆 = {exchangeRate} 人民币（{rateDate}）</p>}
        {!cny && rateError && <p className="rate-hint" style={{ color: '#e74c3c' }}>{rateError}</p>}
      </header>

      <section className="spec-section">
        <h3>1. 价格与车身颜色 <span className="sec-en">Pricing &amp; Colors</span></h3>
        <ul className="spec-list">
          <li><strong>基础零售价：</strong><span className="spec-val">{price(154900)}</span></li>
          <li><strong>特殊颜色附加费：</strong><span className="spec-val">{price(2000)}</span> (仅限特定车漆)</li>
        </ul>
        <h4>可选车身颜色</h4>
        <ul className="color-list">
          <li>铂金白珍珠云母色 <span className="en">Platinum White Pearl Mica</span></li>
          <li>银色金属漆 <span className="en">Silver Metallic</span></li>
          <li>灰色金属漆 <span className="en">Gray Metallic</span></li>
          <li>魅力黑 <span className="en">Attitude Black</span></li>
          <li>幻影棕金属漆 <span className="en">Phantom Brown Metallic</span></li>
        </ul>
      </section>

      <section className="spec-section">
        <h3>2. 动力与核心技术参数 <span className="sec-en">Performance &amp; Technical Specs</span></h3>
        <table className="spec-table">
          <tbody>
            <tr><td>发动机型号</td><td>1GR-FE (24气门，双可变气门正时)</td></tr>
            <tr><td>发动机规格</td><td>4.0升 V6 自然吸气</td></tr>
            <tr><td>最大马力</td><td>235 匹</td></tr>
            <tr><td>峰值扭矩</td><td>376 牛·米</td></tr>
            <tr><td>变速箱</td><td>6速自动变速箱 (带换挡拨片)</td></tr>
            <tr><td>驱动形式</td><td>分时四驱 (4x4 Part-Time)</td></tr>
            <tr><td>油箱容积</td><td>80 升</td></tr>
            <tr><td>燃油效率</td><td>9.6 公里/升 (汽油)</td></tr>
            <tr><td>车辆总重</td><td>2,650 公斤</td></tr>
            <tr><td>车身尺寸</td><td>长 4,795mm × 宽 1,855mm × 高 1,835mm</td></tr>
            <tr><td>轮胎规格</td><td>265/65 R17 (17英寸铝合金轮毂)</td></tr>
          </tbody>
        </table>
      </section>

      <section className="spec-section">
        <h3>3. 外观配置 <span className="sec-en">Exterior Features</span></h3>

        <h4>灯光系统</h4>
        <ul className="spec-list">
          <li>LED 前大灯 (带自动水平调节)</li>
          <li>LED 组合尾灯</li>
          <li>LED 日间行车灯 (DRL)</li>
          <li>前后雾灯</li>
          <li>高位刹车灯</li>
        </ul>

        <h4>镀铬套件</h4>
        <p className="spec-inline">前进气格栅、后尾门饰条、车门把手</p>

        <h4>外后视镜</h4>
        <p className="spec-inline">车身同色/镀铬，支持电动调节与电动折叠</p>

        <h4>车身附件</h4>
        <ul className="spec-list">
          <li>车顶行李架</li>
          <li>车顶扰流板</li>
          <li>前后挡泥板</li>
        </ul>

        <div className="not-equipped">
          <strong>未配备：</strong>电动尾门、前后保险杠扰流板、镀铬排气尾喉
        </div>
      </section>

      <section className="spec-section">
        <h3>4. 内饰与舒适性配置 <span className="sec-en">Interior &amp; Comfort</span></h3>

        <h4>座椅布局 — 7座 (2+3+2 布局)</h4>
        <ul className="spec-list">
          <li>材质：高级织物</li>
          <li>第三排座椅：支持 50:50 折叠</li>
        </ul>

        <h4>驾驶席功能</h4>
        <ul className="spec-list">
          <li>真皮木纹组合方向盘</li>
          <li>方向盘换挡拨片</li>
          <li>一键启动按钮 (Push Start)</li>
          <li>智能无钥匙进入 (Smart Entry)</li>
        </ul>

        <h4>空调系统</h4>
        <p className="spec-inline">三区独立自动恒温空调</p>

        <h4>仪表盘</h4>
        <p className="spec-inline">Optitron 自发光仪表盘 + 4.2英寸 TFT 彩色多功能信息显示屏</p>

        <h4>便利设施</h4>
        <ul className="spec-list">
          <li>冷暖功能手套箱 (冷藏箱)</li>
          <li>全车车窗一键升降 (防夹功能)</li>
        </ul>

        <div className="not-equipped">
          <strong>未配备：</strong>前排电动座椅调节、座椅通风
        </div>
      </section>

      <section className="spec-section">
        <h3>5. 影音娱乐与互联 <span className="sec-en">Audio &amp; Connectivity</span></h3>
        <table className="spec-table">
          <tbody>
            <tr><td>中控屏幕</td><td>8英寸触控显示屏</td></tr>
            <tr><td>手机互联</td><td>Apple CarPlay / Android Auto (预装)</td></tr>
            <tr><td>音响系统</td><td>6 扬声器</td></tr>
            <tr><td>连接接口</td><td>USB / 蓝牙 / AM / FM</td></tr>
          </tbody>
        </table>
      </section>

      <section className="spec-section">
        <h3>6. 安全与驾驶辅助 <span className="sec-en">Safety &amp; Driver Assist</span></h3>

        <h4>被动安全 (气囊)</h4>
        <ul className="spec-list">
          <li>前排双安全气囊 (驾驶员+副驾驶)</li>
          <li>驾驶员膝部气囊</li>
        </ul>

        <h4>主动安全系统</h4>
        <ul className="spec-list">
          <li>防抱死制动系统 (ABS)</li>
          <li>车辆稳定控制系统 (VSC)</li>
          <li>紧急制动信号灯 (EBS)</li>
          <li>胎压监测警报系统 (TPMS)</li>
          <li>上坡辅助控制系统 (HAC)</li>
        </ul>

        <h4>辅助驾驶</h4>
        <ul className="spec-list">
          <li>定速巡航系统</li>
          <li>倒车影像 (后视摄像头)</li>
          <li>驻车雷达：前雷达 + 后雷达</li>
        </ul>

        <h4>越野辅助</h4>
        <ul className="spec-list">
          <li>后差速锁 (Rear Differential Lock)</li>
          <li>自动断开差速器 (ADD)</li>
        </ul>

        <h4>防盗系统</h4>
        <p className="spec-inline">发动机防盗锁止系统 (带警报与芯片)</p>

        <div className="not-equipped">
          <strong>未配备：</strong>盲点监测 (BSM)、后方交叉交通预警 (RCTA)
        </div>
      </section>
    </div>
  );
}
