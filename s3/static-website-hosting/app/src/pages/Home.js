import React from "react";

const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MySPA</h1>
          <p className="hero-subtitle">
            A modern single-page application built with React and designed for
            performance
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-animation">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose MySPA?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Lightning Fast</h3>
              <p>
                Built with modern React and optimized for speed. Experience
                blazing-fast navigation and smooth interactions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Responsive Design</h3>
              <p>
                Perfectly crafted for all devices. From desktop to mobile, your
                experience remains consistent and beautiful.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure & Reliable</h3>
              <p>
                Built with security best practices and modern web standards to
                ensure your data stays safe.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3>Easy to Customize</h3>
              <p>
                Clean, modular code structure makes it simple to extend and
                customize for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of developers who are building amazing applications
            with MySPA.
          </p>
          <button className="btn btn-primary btn-large">
            Start Building Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
