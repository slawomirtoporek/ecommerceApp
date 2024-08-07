import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './components/pages/Home/Home';
import Album from './components/pages/Album/Album';
import Cart from './components/pages/Cart/Cart';
import Order from './components/pages/Order/Order';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import ThankYou from './components/pages/ThankYou/TkankYou';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
