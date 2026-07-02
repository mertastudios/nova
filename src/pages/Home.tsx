import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { t } from '../i18n';

const INVITE_URL = 'YOUR_DISCORD_INVITE_URL_HERE';

export default function Home() {
  const { lang } = useLanguage();
  const [benefitIndex, setBenefitIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  const benefits = [
    t(lang, 'home.benefit1'),
    t(lang, 'home.benefit2'),
    t(lang, 'home.benefit3'),
    t(lang, 'home.benefit4'),
    t(lang, 'home.benefit5'),
    t(lang, 'home.benefit6'),
    t(lang, 'home.benefit7'),
  ];

  useEffect(() => {
    setHeroVisible(true);
    const timer = setTimeout(() => setCardsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setBenefitIndex((prev) => (prev + 1) % benefits.length);
        setVisible(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, [benefits.length]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Background effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-violet-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-cyan-900/20 rounded-full blur-[150px] pointer-events-none"></div>

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16 flex-grow flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Hero icon */}
        <div className={`relative mb-8 md:mb-10 group transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full blur-2xl opacity-40 animate-glow"></div>
          <div className="w-28 h-28 md:w-40 md:h-40 bg-slate-900/90 border-2 border-violet-500/40 rounded-full flex items-center justify-center text-5xl md:text-7xl shadow-2xl animate-float transition-all duration-300 group-hover:border-cyan-400/60">
            🌙
          </div>
        </div>

        {/* Discord AI Chatbot badge */}
        <div className={`transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center space-x-2 bg-indigo-950/60 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-5 text-sm">
            <i className="fa-brands fa-discord text-indigo-400"></i>
            <span className="text-indigo-300 font-medium">{t(lang, 'home.discord_chatbot')}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {t(lang, 'home.meet')} <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Nova AI</span>
        </h1>

        {/* Subtitle */}
        <p className={`text-lg md:text-xl text-slate-400 max-w-2xl mb-4 transition-all duration-1000 delay-400 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {t(lang, 'home.subtitle')}
        </p>

        {/* Description */}
        <p className={`text-sm md:text-base text-slate-500 max-w-xl mb-8 leading-relaxed transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {t(lang, 'home.description')}
        </p>

        {/* Rotating benefits */}
        <div className={`h-12 md:h-16 flex items-center justify-center mb-10 transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`text-lg md:text-2xl font-medium font-mono transition-all duration-500 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {benefits[benefitIndex]}
          </p>
        </div>

        {/* CTA Button */}
        <div className={`relative group mb-16 transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white font-bold text-base md:text-xl rounded-xl shadow-2xl transition duration-300 flex items-center space-x-3 transform group-hover:scale-[1.02]">
            <i className="fa-brands fa-discord text-xl md:text-2xl"></i>
            <span>{t(lang, 'home.invite')}</span>
          </a>
        </div>

        {/* Highlight cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 group">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <i className="fa-brands fa-discord text-2xl text-violet-400"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{t(lang, 'home.highlight1_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t(lang, 'home.highlight1_desc')}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 group">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <i className="fa-solid fa-gift text-2xl text-cyan-400"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{t(lang, 'home.highlight2_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t(lang, 'home.highlight2_desc')}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10 group">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <i className="fa-solid fa-bolt text-2xl text-pink-400"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{t(lang, 'home.highlight3_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t(lang, 'home.highlight3_desc')}</p>
          </div>
        </div>

      </main>
    </div>
  );
}
