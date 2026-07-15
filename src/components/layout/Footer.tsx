import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Zap Clean Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Reliable, professional, and convenient mobile cleaning services delivered straight to your door in the greater Johannesburg area.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-primary transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/book" className="text-gray-400 hover:text-primary transition-colors">Book Online</Link>
              </li>
              <li>
                <a href="/#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              <li className="text-gray-400">Upholstery Cleaning</li>
              <li className="text-gray-400">Mobile Car Wash</li>
              <li className="text-gray-400">Carpet Cleaning</li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>060 840 8260</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>zapclean@8conn.co.za</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Serving Johannesburg, Sandton, Fourways, and Midrand</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Zap Clean. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
