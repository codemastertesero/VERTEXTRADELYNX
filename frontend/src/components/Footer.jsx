import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <img src="/logo.png" alt="Vertex TradeLynx" className="footer__logo" />
            <p className="footer__tagline">
              Your trusted global freight forwarding partner. Moving cargo across the world with precision, speed, and integrity.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="LinkedIn" className="footer__social"><Linkedin size={16} /></a>
              <a href="#" aria-label="Twitter" className="footer__social"><Twitter size={16} /></a>
              <a href="#" aria-label="Facebook" className="footer__social"><Facebook size={16} /></a>
            </div>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__heading">Services</h4>
            <ul className="footer__list">
              {["Air Freight","Sea Freight","Special Projects","Contract Logistics","Customs Clearance","Insurance & Protection"].map(s => (
                <li key={s}><Link to="/services" className="footer__link"><ArrowRight size={12} />{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="footer__col">
            <h4 className="footer__heading">Industries</h4>
            <ul className="footer__list">
              {["Automotive","Technology","Healthcare","Energy","Industrial","Aerospace","Chemicals","Consumer"].map(i => (
                <li key={i}><Link to="/industries" className="footer__link"><ArrowRight size={12} />{i}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__contact-list">
              <li>
                <a href="tel:+919503645532" className="footer__contact-item">
                  <Phone size={15} />
                  <span>+91 95036 45532</span>
                </a>
              </li>
              <li>
                <a href="mailto:nilesh@vertextradelynx.com" className="footer__contact-item">
                  <Mail size={15} />
                  <span>nilesh@vertextradelynx.com</span>
                </a>
              </li>
              <li>
                <div className="footer__contact-item">
                  <MapPin size={15} />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </li>
            </ul>
            <Link to="/quote" className="btn btn-primary" style={{ marginTop: 20, fontSize: 13 }}>
              Get a Free Quote
            </Link>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Vertex TradeLynx. All rights reserved. | Freight Forwarding · Logistics · Export</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
