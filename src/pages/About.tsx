import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { t } from '../i18n';

export default function About() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 md:py-16 flex-grow flex flex-col items-center justify-center">
      <div className={`bg-slate-900/50 border border-slate-800 p-6 md:p-12 rounded-3xl w-full text-center relative overflow-hidden backdrop-blur-sm transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 rounded-full"></div>
        
        {/* Avatar */}
        <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-full mx-auto flex items-center justify-center text-3xl md:text-4xl font-extrabold text-white shadow-xl mb-6 animate-float">
          M
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide mb-2">
          {t(lang, 'about.title_prefix')} <span className="text-violet-400">Merta</span>
        </h1>
        <p className="text-slate-400 font-mono text-xs md:text-sm mb-6 flex items-center justify-center space-x-1.5 flex-wrap">
          <i className="fa-brands fa-discord text-indigo-400"></i>
          <span>{t(lang, 'about.discord_handle')} <strong className="text-slate-200">YOUR_DISCORD_USERNAME_HERE</strong></span>
        </p>

        <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-sm md:text-base">
          {t(lang, 'about.bio')}
        </p>

        <div className="inline-flex items-center space-x-3 bg-violet-950/60 border border-violet-800/50 rounded-2xl px-4 md:px-5 py-3 mb-10 max-w-md text-left">
          <i className="fa-solid fa-wand-magic-sparkles text-lg md:text-xl text-pink-400 shrink-0"></i>
          <p className="text-xs text-violet-200 leading-normal">
            <strong className="text-white block font-semibold mb-0.5">{t(lang, 'about.collab_title')}</strong>
            {t(lang, 'about.collab_desc')} <span className="text-cyan-400 font-bold">Claude</span>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
          <a href="YOUR_YOUTUBE_CHANNEL_URL_HERE" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02] hover:shadow-red-500/20">
            <i className="fa-brands fa-youtube"></i>
            <span>{t(lang, 'about.youtube')}</span>
          </a>
          <Link to="/help" className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-700 hover:scale-[1.02]">
            <i className="fa-solid fa-book"></i>
            <span>{t(lang, 'about.docs')}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
