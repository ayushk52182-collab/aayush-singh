import { Sparkles } from 'lucide-react';

const Footer = () => (
  <footer className="footer-credit">
    <div className="footer-line"></div>
    <p className="footer-text">
      <Sparkles size={14} className="footer-sparkle" />
      Designed & Engineered by <strong className="author-name">Aayush Singh</strong>
    </p>
  </footer>
);

export default Footer;
