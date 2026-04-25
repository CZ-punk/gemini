import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-header center">
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-underline"></div>
        </div>
        <p className="contact-description">
          새로운 프로젝트 협업이나 채용 관련 문의는 언제든 환영합니다.<br />
          아래 버튼을 통해 메일을 보내주세요!
        </p>
        <div className="contact-info">
          <a href="mailto:your.email@example.com" className="email-link">
            your.email@example.com
          </a>
        </div>
        <div className="social-links">
          <a href="#" className="social-icon">GitHub</a>
          <a href="#" className="social-icon">LinkedIn</a>
          <a href="#" className="social-icon">Twitter</a>
        </div>
        <footer className="footer">
          <p>&copy; 2024 Premium Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
