import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const products = [
  {
    id: 1,
    name: 'Canvas Tote',
    price: 24,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 2,
    name: 'Studio Headphones',
    price: 89,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 3,
    name: 'Ceramic Mug',
    price: 18,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 4,
    name: 'Minimal Watch',
    price: 126,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 5,
    name: 'Desk Lamp',
    price: 54,
    category: 'Workspace',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 6,
    name: 'Everyday Sneakers',
    price: 68,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function App() {
  const [cart, setCart] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const cartCount = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  function addToCart(product) {
    setCheckoutMessage('');
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(productId, amount) {
    setCheckoutMessage('');
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId) {
    setCheckoutMessage('');
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  }

  return (
    <div className="shop">
      <header className="shop-header">
        <a className="brand" href="../../../index.html" aria-label="Back to Aayush Pandey course archive">
          <span className="brand-mark" aria-hidden="true">AP</span>
          <span>AAYUSH PANDEY <small>WEB PROGRAMMING</small></span>
        </a>
        <nav aria-label="Shop navigation">
          <a className="active" href="#products">Products</a>
          <a href="#cart">Cart <span className="cart-badge">{cartCount}</span></a>
          <a href="../../index.html">Week 12</a>
        </nav>
      </header>

      <main className="shop-layout">
        <section className="product-section" id="products" aria-labelledby="shop-title">
          <div className="title-row">
            <div>
              <p className="eyebrow">WEEK 12 · PART 1 · REACT STATE</p>
              <h1 id="shop-title">React Shopping Cart.</h1>
              <p className="shop-intro">A working cart demonstration built with React state, reusable product data, and calculated totals.</p>
            </div>
            <p className="collection-count">{products.length} products</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="quick-add"
                    type="button"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    +
                  </button>
                </div>
                <div className="product-info">
                  <div>
                    <p>{product.category}</p>
                    <h2>{product.name}</h2>
                  </div>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart-panel" id="cart" aria-labelledby="cart-title">
          <div className="cart-heading">
            <div>
              <p className="eyebrow">AAYUSH PANDEY · 202537201</p>
              <h2 id="cart-title">Your Cart <span>{cartCount}</span></h2>
            </div>
            {cart.length > 0 && (
              <button className="clear-button" type="button" onClick={() => setCart([])}>
                Clear
              </button>
            )}
          </div>

          <div className="cart-items" aria-live="polite">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <span aria-hidden="true">○</span>
                <p>Your cart is empty.</p>
                <small>Choose something from the collection.</small>
              </div>
            ) : (
              cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-copy">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>
                    <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </article>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-line">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p>Shipping calculated at checkout.</p>
            <button className="checkout-button" type="button" disabled={cart.length === 0} onClick={() => setCheckoutMessage('Checkout is a demonstration only. No payment has been processed.')}>
              Demo Checkout
              <span aria-hidden="true">→</span>
            </button>
            <p className="checkout-message" role="status">{checkoutMessage}</p>
          </div>
        </aside>
      </main>
      <footer className="shop-footer">
        <span>Aayush Pandey · 202537201</span>
        <span>Week 12 Part 1 · React State &amp; Shopping Cart</span>
        <a href="../../../index.html">Back to Course Archive ↑</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
