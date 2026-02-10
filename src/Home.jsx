import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <h1>工具箱</h1>
      <nav className="tool-list">
        <Link to="/calculator" className="tool-card">
          <span className="tool-icon">&#x1F4B0;</span>
          <div>
            <h2>固定利率分期计算器</h2>
            <p>输入总价、首付比例、利率和期限，计算月供及还款明细</p>
          </div>
        </Link>
        <Link to="/specs" className="tool-card">
          <span className="tool-icon">&#x1F697;</span>
          <div>
            <h2>配置信息</h2>
            <p>2026款 丰田 FORTUNER 4.0L GXR 详细配置参数</p>
          </div>
        </Link>
      </nav>
    </div>
  );
}
