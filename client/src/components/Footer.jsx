import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-6 group">
              <div className="h-16 w-16 bg-white rounded-lg p-1.5 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Siruvapuri Murugan Matrimony"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">
                  Siruvapuri Murugan
                </h3>
                <span className="text-xs font-medium text-primary tracking-wider uppercase">
                  Matrimony
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              A trusted platform for South Indian weddings, bringing families together with tradition and technology.
            </p>
            {/* Social/Contact Icons */}
            <div className="flex space-x-3">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:info@siruvapurimurugan.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Mail size={18} />
              </a>
              <a
                href="tel:+919999999999"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg relative">
              Company
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary -mb-2"></span>
            </h4>
            <ul className="space-y-4 text-sm mt-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support Links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg relative">
              Help & Support
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary -mb-2"></span>
            </h4>
            <ul className="space-y-4 text-sm mt-4">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-lg relative">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary -mb-2"></span>
            </h4>
            <div className="space-y-4 text-sm mt-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-gray-400">Call us at</p>
                  <a href="tel:+919999999999" className="text-white hover:text-primary transition-colors">
                    +91 99999 99999
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-gray-400">Email us at</p>
                  <a href="mailto:info@siruvapurimurugan.com" className="text-white hover:text-primary transition-colors">
                    info@siruvapurimurugan.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Siruvapuri Murugan Matrimonial. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
