import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A0A12] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C0136A] to-[#E8A0BF] flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-[#E8A0BF]">Job</span>Portal
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Connecting talented professionals with India's best companies. Your dream career awaits.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8A0BF] mb-3">Platform</p>
              <div className="flex flex-col gap-2 text-sm text-white/60">
                <Link to="/Jobs" className="hover:text-[#E8A0BF] transition-colors">Browse Jobs</Link>
                <Link to="/Browse" className="hover:text-[#E8A0BF] transition-colors">Search</Link>
                <Link to="/Profile" className="hover:text-[#E8A0BF] transition-colors">Profile</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8A0BF] mb-3">Legal</p>
              <div className="flex flex-col gap-2 text-sm text-white/60">
                <Link to="/PrivacyPolicy" className="hover:text-[#E8A0BF] transition-colors">Privacy Policy</Link>
                <Link to="/TermsofService" className="hover:text-[#E8A0BF] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 JobPortal. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 fill-[#C0136A] text-[#C0136A]" /> by{" "}
            <a
              href="https://github.com/Ritulx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8A0BF] hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> Ritul
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;