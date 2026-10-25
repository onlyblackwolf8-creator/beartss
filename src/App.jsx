
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api';

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/_be.arts/',
  tiktok: 'https://vm.tiktok.com/ZS9UGMtFeSuYK-pOpax/',
  whatsapp:
    'https://wa.me/254720661462?text=Hello%20BEARTS%2C%20I%27m%20interested%20in%20your%20artwork.',
};

function SocialLinks({ footer = false }) {
  return (
    <div
      className={`social-links${footer ? ' footer-social-links' : ''}`}
      aria-label="BEARTS social media"
    >
      <a
        className="social-icon instagram-icon"
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow BEARTS on Instagram"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5"
            fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4"
            fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
        <span>Instagram</span>
      </a>

      <a
        className="social-icon tiktok-icon"
        href={SOCIAL_LINKS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow BEARTS on TikTok"
        title="TikTok"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.6 8.1a7.2 7.2 0 0 1-4.4-1.5v8.1a6.1 6.1 0 1 1-5.3-6.05v3.3a2.9 2.9 0 1 0 2.1 2.8V2.5h3.2c.3 2.1 1.8 3.7 4.4 4v3.1Z"
          />
        </svg>
        <span>TikTok</span>
      </a>

      <a
        className="social-icon whatsapp-icon"
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BEARTS on WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a9.8 9.8 0 0 0-8.4 14.9L2.3 22l5.2-1.3A9.9 9.9 0 1 0 12 2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 19.8Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.5.3-.4c.1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5.5.2.9.4 1.2.4.5.2 1 .1 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.2-.3-.2-.5-.3Z"
          />
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orderForm, setOrderForm] = useState({
    name: '',
    artworkType: '',
    size: 'Standard',
    message: '',
  });

  const [commissionForm, setCommissionForm] = useState({
    name: '',
    projectType: '',
    details: '',
  });

  const [orderStatus, setOrderStatus] = useState('');
  const [commissionStatus, setCommissionStatus] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error('Unable to load artwork right now.');
        }

        const data = await response.json();

        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateOrderForm(event) {
    const { name, value } = event.target;

    setOrderForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function updateCommissionForm(event) {
    const { name, value } = event.target;

    setCommissionForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleOrderSubmit(event) {
    event.preventDefault();

    const message = [
      "🎨 BEARTS ARTWORK ORDER",
      "",
      `Name: ${orderForm.name}`,
      `Artwork type: ${orderForm.artworkType}`,
      `Size: ${orderForm.size}`,
      `Additional notes: ${orderForm.message || "None"}`,
      "",
      "Hello BEARTS, I would like to place this artwork order. Please confirm the price and next steps."
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/254720661462?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setOrderStatus(
      "WhatsApp opened. Please review your order and press Send to contact BEARTS."
    );
  }

  function handleCommissionSubmit(event) {
    event.preventDefault();

    const message = [
      "🖼️ BEARTS COMMISSION REQUEST",
      "",
      `Name: ${commissionForm.name}`,
      `Project type: ${commissionForm.projectType}`,
      `Project details: ${commissionForm.details}`,
      "",
      "Hello BEARTS, I would like a quote for this commission. Please let me know the price and next steps."
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/254720661462?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setCommissionStatus(
      "WhatsApp opened. Please review your commission request and press Send."
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav">
          <a href="#home" className="logo" aria-label="BEARTS home">
            BEARTS
          </a>

          <nav className="menu" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#collection">Collection</a>
            <a href="#pricing">Pricing</a>
            <a href="#commissions">Commissions</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#contact" className="btn btn-primary">
            Order Art
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="badge">Original art studio</span>

              <h1>Art that makes your space feel alive.</h1>

              <p>
                BEARTS creates original paintings, custom commissions, and
                collectible art for homes, offices, and meaningful gifts.
              </p>

              <div className="hero-actions">
                <a href="#collection" className="btn btn-primary">
                  Shop Collection
                </a>

                <a href="#commissions" className="btn btn-secondary">
                  Commission a Piece
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="art-card">
                <video
                  className="art-image"
                  src="/videos/BEARTS.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="BEARTS featured art video"
                />

                <div className="floating-card">
                  <strong>Featured Piece</strong>
                  <span>BEARTS — Original Art</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collection" className="section">
          <div className="container">
            <div className="section-head">
              <h2>Featured works</h2>

              <a href="#contact" className="btn btn-secondary">
                Enquire about artwork
              </a>
            </div>

            {loading ? (
              <p>Loading artwork...</p>
            ) : products.length === 0 ? (
              <p>
                Artwork is temporarily unavailable. Please check back later or
                contact us about a custom piece.
              </p>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <article key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    <div className="product-info">
                      <div className="product-row">
                        <h3>{product.name}</h3>

                        <span>
                          KSh{' '}
                          {Number(product.price || 0).toLocaleString('en-KE')}
                        </span>
                      </div>

                      <p>{product.category}</p>

                      <a
                        className="art-order-link"
                        href={`${SOCIAL_LINKS.whatsapp}&type=custom`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>


        <section id="pricing" className="section pricing-section">
          <div className="container">
            <div className="pricing-heading">
              <span className="badge">Transparent pricing</span>
              <h2>Commission rates.</h2>
              <p>
                Prices are in Kenyan shillings. Final quotes may vary with
                complexity, detail and materials.
              </p>
            </div>

            <div className="pricing-grid">
              <article className="pricing-card">
                <h3>01. Charcoal portraits</h3>
                <div className="price-row"><span>A5</span><strong>KSh 4,500</strong></div>
                <div className="price-row"><span>A4</span><strong>KSh 7,000</strong></div>
                <div className="price-row"><span>A3</span><strong>KSh 11,000</strong></div>
                <div className="price-row"><span>A2</span><strong>KSh 15,000</strong></div>
              </article>

              <article className="pricing-card">
                <h3>02. Graphite portraits</h3>
                <div className="price-row"><span>A5</span><strong>KSh 3,000</strong></div>
                <div className="price-row"><span>A4</span><strong>KSh 5,000</strong></div>
                <div className="price-row"><span>A3</span><strong>KSh 8,000</strong></div>
                <div className="price-row"><span>A2</span><strong>KSh 15,500</strong></div>
              </article>

              <article className="pricing-card">
                <h3>03. Penwork</h3>
                <div className="price-row"><span>A5</span><strong>KSh 2,500</strong></div>
                <div className="price-row"><span>A4</span><strong>KSh 4,500</strong></div>
                <div className="price-row"><span>A3</span><strong>KSh 7,500</strong></div>
                <div className="price-row"><span>A2</span><strong>KSh 16,500</strong></div>
              </article>

              <article className="pricing-card">
                <h3>04. Painting</h3>
                <div className="price-row"><span>A5</span><strong>KSh 4,000</strong></div>
                <div className="price-row"><span>A4</span><strong>KSh 6,500</strong></div>
                <div className="price-row"><span>A3</span><strong>KSh 10,500</strong></div>
                <div className="price-row"><span>A2</span><strong>KSh 18,000</strong></div>
              </article>

              <article className="pricing-card">
                <h3>05. Custom cards</h3>
                <div className="price-row"><span>Standard</span><strong>KSh 700</strong></div>
                <div className="price-row"><span>Personalised</span><strong>KSh 1,200</strong></div>
                <div className="price-row"><span>Premium detailed</span><strong>KSh 2,000</strong></div>
              </article>
            </div>

            <div className="pricing-details">
              <div>
                <h3>Customisation &amp; extras</h3>
                <ul>
                  <li>Detailed backgrounds — from KSh 1,500</li>
                  <li>Additional subjects — quoted separately</li>
                  <li>Framing — priced separately</li>
                  <li>Urgent commissions — extra charges apply</li>
                </ul>
              </div>

              <div>
                <h3>Booking terms</h3>
                <ul>
                  <li>50% deposit before work begins</li>
                  <li>Balance payable upon completion</li>
                  <li>Final price depends on complexity, detail and materials</li>
                </ul>
              </div>
            </div>

            <div className="pricing-cta">
              <div>
                <h3>Ready to commission your artwork?</h3>
                <p>Tell us what you have in mind and get a quote from BEARTS.</p>
              </div>
              <a
                className="btn btn-primary"
                href="https://wa.me/254720661462?text=Hello%20BEARTS%2C%20I%20would%20like%20to%20enquire%20about%20commission%20pricing."
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on WhatsApp
              </a>
            </div>

            <details className="pricing-reference">
              <summary>View original pricing reference</summary>
              <img
                src="/images/bearts-commission-rates.jpeg"
                alt="Original BEARTS commission rates and booking terms reference"
                loading="lazy"
              />
            </details>
          </div>
        </section>

        <section id="commissions" className="section">
          <div className="container commission-box">
            <div>
              <span className="badge">Custom art</span>

              <h2>Commission a piece made just for you</h2>

              <p>
                Whether you want a portrait, abstract work, or art for a
                special room, we create custom pieces tailored to your story,
                space, and style.
              </p>

              <p>
                Prefer a direct conversation? Send us your idea on WhatsApp.
              </p>

              <a
                className="btn btn-secondary"
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

            <form className="order-form" onSubmit={handleCommissionSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                value={commissionForm.name}
                onChange={updateCommissionForm}
                required
              />

              <input
                type="text"
                name="projectType"
                placeholder="Project type"
                value={commissionForm.projectType}
                onChange={updateCommissionForm}
                required
              />

              <textarea
                name="details"
                rows="4"
                placeholder="Tell us about your vision..."
                value={commissionForm.details}
                onChange={updateCommissionForm}
                required
              />

              <button type="submit" className="btn btn-primary">
                Request a quote
              </button>

              {commissionStatus && (
                <p className="status-message" role="status">
                  {commissionStatus}
                </p>
              )}
            </form>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container about">
            <div className="about-card">
              <h2>About BEARTS</h2>

              <p>
                BEARTS is an art studio focused on emotion, texture, and
                story-driven design. Each piece is created with intention —
                whether it is a collectible original or a custom work made
                for a meaningful place in someone's life.
              </p>

              <p>
                Follow our creative journey and discover more original
                artwork on social media.
              </p>

              <SocialLinks />
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-box">
            <div className="contact-copy">
              <span className="badge">Order / Contact</span>

              <h2>Get your custom art project started</h2>

              <p>
                Have an idea for a portrait or original artwork? Contact
                BEARTS using your preferred channel.
              </p>

              <h3>Connect with BEARTS</h3>

              <SocialLinks />

              <p>
                <strong>WhatsApp:</strong> +254 720 661 462
              </p>
            </div>

            <form className="order-form" onSubmit={handleOrderSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                value={orderForm.name}
                onChange={updateOrderForm}
                required
              />

              <input
                type="text"
                name="artworkType"
                placeholder="Artwork type"
                value={orderForm.artworkType}
                onChange={updateOrderForm}
                required
              />

              <select
                name="size"
                value={orderForm.size}
                onChange={updateOrderForm}
              >
                <option value="Standard">Standard</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>

              <textarea
                name="message"
                rows="4"
                placeholder="Add notes for your order..."
                value={orderForm.message}
                onChange={updateOrderForm}
              />

              <button type="submit" className="btn btn-primary">
                Place Order
              </button>

              {orderStatus && (
                <p className="status-message" role="status">
                  {orderStatus}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 BEARTS — Original art and custom commissions</p>

          <SocialLinks footer />

          <p>
            For artwork enquiries and commissions, reach us on WhatsApp at{' '}
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              +254 720 661 462
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
