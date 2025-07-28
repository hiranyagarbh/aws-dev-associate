import React from "react";

const About = () => {
  return (
    <div className="page">
      <section className="page-header">
        <div className="container">
          <h1>About MySPA</h1>
          <p className="page-subtitle">
            Learn more about our mission and what drives us forward
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                MySPA was born from a simple idea: web applications should be
                fast, beautiful, and accessible to everyone. In 2024, we set out
                to create a single-page application framework that combines the
                power of React with modern design principles and performance
                optimization.
              </p>
              <p>
                What started as a small project has grown into a comprehensive
                solution used by developers worldwide. We believe that great
                user experiences shouldn't come at the cost of developer
                experience, which is why MySPA focuses on simplicity,
                performance, and maintainability.
              </p>

              <h3>Our Mission</h3>
              <p>
                To empower developers and businesses to create exceptional web
                experiences that are fast, accessible, and delightful to use. We
                strive to make modern web development more approachable while
                maintaining the highest standards of quality and performance.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">10k+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user-circle"></i>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Lead Developer</p>
              <p>
                Full-stack developer with 8 years of experience in React and
                modern web technologies.
              </p>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user-circle"></i>
              </div>
              <h3>Mike Chen</h3>
              <p className="member-role">UI/UX Designer</p>
              <p>
                Creative designer passionate about creating intuitive and
                beautiful user experiences.
              </p>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user-circle"></i>
              </div>
              <h3>Alex Rodriguez</h3>
              <p className="member-role">DevOps Engineer</p>
              <p>
                Infrastructure expert ensuring our applications run smoothly and
                scale efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <i className="fas fa-heart"></i>
              <h3>User-Centric</h3>
              <p>
                Every decision we make is guided by what's best for our users
                and their experience.
              </p>
            </div>
            <div className="value-item">
              <i className="fas fa-code"></i>
              <h3>Quality Code</h3>
              <p>
                We believe in writing clean, maintainable code that stands the
                test of time.
              </p>
            </div>
            <div className="value-item">
              <i className="fas fa-users"></i>
              <h3>Community</h3>
              <p>
                We're committed to fostering an inclusive and supportive
                developer community.
              </p>
            </div>
            <div className="value-item">
              <i className="fas fa-lightbulb"></i>
              <h3>Innovation</h3>
              <p>
                We continuously explore new technologies and approaches to stay
                ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
