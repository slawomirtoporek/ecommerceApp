import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Album from './components/pages/Album/Album';
import Cart from './components/pages/Cart/Cart';
import Order from './components/pages/Order/Order';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album/:id" element={<Album />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
