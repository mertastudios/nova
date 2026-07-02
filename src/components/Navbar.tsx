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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { path: '/', label: t(lang, 'nav.home'), icon: 'fa-solid fa-house' },
    { path: '/help', label: t(lang, 'nav.features'), icon: 'fa-solid fa-circle-question' },
    { path: '/about', label: t(lang, 'nav.about'), icon: 'fa-solid fa-user' },
    { path: '/privacy', label: t(lang, 'nav.privacy'), icon: 'fa-solid fa-shield-halved' },
    { path: '/terms', label: t(lang, 'nav.terms'), icon: 'fa-solid fa-file-contract' },
  ];

  return (
    <>
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
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-in Menu from Left */}
      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-slate-950 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌙</span>
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold text-lg">Nova AI</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-slate-400 hover:text-violet-400 transition-colors p-2"
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Menu Links */}
        <div className="p-4 space-y-2">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-violet-400 bg-violet-500/10 border-l-2 border-violet-400'
                  : 'text-slate-400 hover:text-violet-400 hover:bg-slate-800/50'
              }`}
              style={{ 
                transitionDelay: menuOpen ? `${idx * 50}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.3s ease ${menuOpen ? idx * 50 : 0}ms`
              }}
            >
              <i className={`${link.icon} w-5 text-center`}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">© 2026 Nova AI by Merta</p>
        </div>
      </div>
    </>
  );
}
