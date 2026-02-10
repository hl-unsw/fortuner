import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Calculator from './Calculator';
import Specs from './Specs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/specs" element={<Specs />} />
      </Routes>
    </BrowserRouter>
  );
}
