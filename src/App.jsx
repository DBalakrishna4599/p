import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './App.css';


import './LandingPage.css';
// Landing Page Component
const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Bringing nature's beauty into your home with our premium selection of houseplants. 
           We specialize in rare and exotic varieties to transform any space into a green oasis.</p>
           <Link to="/products" className="cta-button">Explore Plants</Link>
      </div>
    </div>
  );
};

// Product Component
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

// Products Page Component
const ProductsPage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Snake Plant', price: 24.99, category: 'low-light', image: 'snake-plant.jpeg' },
    { id: 2, name: 'ZZ Plant', price: 29.99, category: 'low-light', image: 'zz-plant.jpeg' },
    { id: 3, name: 'Fiddle Leaf Fig', price: 39.99, category: 'bright-light', image: 'fiddle-leaf.jpeg' },
    { id: 4, name: 'Monstera Deliciosa', price: 34.99, category: 'bright-light', image: 'monstera.jpeg' },
    { id: 5, name: 'Peace Lily', price: 19.99, category: 'flowering', image: 'peace-lily.jpeg' },
    { id: 6, name: 'Phalaenopsis Orchid', price: 27.99, category: 'flowering', image: 'orchid.jpeg' }
  ]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show notification
    alert(`${product.name} added to cart!`);
  };

  return (
    <main className="products-container">
      <h2>Our Plant Collection</h2>
      
      <section className="category">
        <h3>Low Light Plants</h3>
        <div className="products-grid">
          {products.filter(p => p.category === 'low-light').map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="category">
        <h3>Bright Light Plants</h3>
        <div className="products-grid">
          {products.filter(p => p.category === 'bright-light').map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="category">
        <h3>Flowering Plants</h3>
        <div className="products-grid">
          {products.filter(p => p.category === 'flowering').map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>
    </main>
  );
};

// Cart Page Component
const CartPage = ({ cart, setCart }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    setCart([]);
  };

  return (
    <main className="cart-container">
      <h2>Your Shopping Cart</h2>
      
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button className="remove-item" onClick={() => removeItem(item.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items:</span>
            <span className="total-items">{totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Total:</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="cart-actions">
          <Link to="/products" className="btn continue-shopping">Continue Shopping</Link>
          <button 
            className="btn checkout" 
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

// Header Component
const Header = ({ cart }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">Paradise Nursery</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Plants</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart />
              <span className="cart-count">{totalItems}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Main App Component
const App = () => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('paradise-nursery-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('paradise-nursery-cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div className="app">
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;