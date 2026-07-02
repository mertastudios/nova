import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { t, type Lang } from '../i18n';

const langLabels: Record<Lang, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'English' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
};

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t(lang, 'nav.home') },
    { path: '/help', label: t(lang, 'nav.features') },
    { path: '/about', label: t(lang, 'nav.about') },
    { path: '/privacy', label: t(lang, 'nav.privacy') },
    { path: '/terms', label: t(lang, 'nav.terms') },
  ];

  return (
    <nav className="border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger - always top left */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-300 hover:text-violet-400 transition-colors p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
            </div>
          </button>
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-wider hover:opacity-90 transition">
            <span className="text-2xl animate-pulse">🌙</span>
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Nova AI</span>
          </Link>
        </div>

        {/* Language switcher - top right */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-violet-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50"
            aria-label="Switch language"
          >
            <span className="text-xl">{langLabels[lang].flag}</span>
            <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}></i>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden min-w-[160px] animate-fadeIn">
              {(Object.keys(langLabels) as Lang[]).map((key) => (
                <button
                  key={key}
                  onClick={() => { setLang(key); setLangOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors hover:bg-slate-800 ${lang === key ? 'text-violet-400 bg-slate-800/50' : 'text-slate-300'}`}
                >
                  <span className="text-lg">{langLabels[key].flag}</span>
                  <span>{langLabels[key].label}</span>
                  {lang === key && <i className="fa-solid fa-check ml-auto text-violet-400"></i>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile / Hamburger Slide-in Menu */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-slate-800/60 bg-slate-950/90 backdrop-blur-lg px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-violet-400 bg-violet-500/10'
                  : 'text-slate-400 hover:text-violet-400 hover:bg-slate-800/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
