import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { t } from '../i18n';

const INVITE_URL = 'YOUR_DISCORD_INVITE_URL_HERE';

/*
 * ============================================================
 *  FAQ DATA — Edit questions and answers here easily
 * ============================================================
 */
function getFaqItems(lang: string) {
  return [
    {
      q: t(lang as any, 'help.faq1_q'),
      a: t(lang as any, 'help.faq1_a'),
    },
    {
      q: t(lang as any, 'help.faq2_q'),
      a: t(lang as any, 'help.faq2_a'),
    },
    {
      q: t(lang as any, 'help.faq3_q'),
      a: t(lang as any, 'help.faq3_a'),
    },
  ];
}

function FaqAccordion() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqItems = getFaqItems(lang);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {faqItems.map((item, idx) => (
        <div
          key={idx}
          className={`bg-slate-900/40 border rounded-xl overflow-hidden transition-all duration-500 ${
            openIndex === idx ? 'border-pink-500/30 shadow-lg shadow-pink-500/5' : 'border-slate-800'
          }`}
        >
          <button
            onClick={() => toggle(idx)}
            className="w-full flex justify-between items-center p-4 md:p-5 text-left font-medium text-slate-200 hover:bg-slate-800/30 transition-colors duration-200"
          >
            <span className="pr-4 text-sm md:text-base">{item.q}</span>
            <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 text-sm shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}></i>
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 md:p-5 border-t border-slate-800/80 bg-slate-950/40 text-slate-300 text-sm leading-relaxed">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Help() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t1 = setTimeout(() => setFeaturesVisible(true), 400);
    const t2 = setTimeout(() => setFaqVisible(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const commands = [
    { name: '/set_channel', admin: true, desc: t(lang, 'help.cmd_set_channel') },
    { name: '/edit_personality', admin: true, desc: t(lang, 'help.cmd_edit_personality') },
    { name: '/manage_api_keys', admin: true, desc: t(lang, 'help.cmd_manage_api_keys') },
    { name: '/set_language', admin: true, desc: t(lang, 'help.cmd_set_language') },
    { name: '/reset_chat_history', admin: true, desc: t(lang, 'help.cmd_reset_chat_history') },
    { name: '/feedback', admin: false, desc: t(lang, 'help.cmd_feedback') },
  ];

  const features = [
    { icon: 'fa-solid fa-bolt', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'hover:border-yellow-500/40', title: t(lang, 'help.feat1_title'), desc: t(lang, 'help.feat1_desc') },
    { icon: 'fa-solid fa-brain', color: 'text-violet-400', bgColor: 'bg-violet-500/10', borderColor: 'hover:border-violet-500/40', title: t(lang, 'help.feat2_title'), desc: t(lang, 'help.feat2_desc') },
    { icon: 'fa-solid fa-masks-theater', color: 'text-pink-400', bgColor: 'bg-pink-500/10', borderColor: 'hover:border-pink-500/40', title: t(lang, 'help.feat3_title'), desc: t(lang, 'help.feat3_desc') },
    { icon: 'fa-solid fa-heart', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'hover:border-emerald-500/40', title: t(lang, 'help.feat4_title'), desc: t(lang, 'help.feat4_desc') },
    { icon: 'fa-solid fa-paperclip', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', borderColor: 'hover:border-cyan-500/40', title: t(lang, 'help.feat5_title'), desc: t(lang, 'help.feat5_desc') },
    { icon: 'fa-solid fa-rotate', color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'hover:border-orange-500/40', title: t(lang, 'help.feat6_title'), desc: t(lang, 'help.feat6_desc') },
    { icon: 'fa-solid fa-terminal', color: 'text-indigo-400', bgColor: 'bg-indigo-500/10', borderColor: 'hover:border-indigo-500/40', title: t(lang, 'help.feat7_title'), desc: t(lang, 'help.feat7_desc') },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 md:py-12 flex-grow w-full overflow-x-hidden">
      
      {/* Header */}
      <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">{t(lang, 'help.title')}</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">{t(lang, 'help.subtitle')}</p>
      </div>

      {/* Slash Commands */}
      <section className={`mb-12 md:mb-16 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center space-x-3 text-violet-400">
          <i className="fa-solid fa-terminal text-lg md:text-xl"></i>
          <span>{t(lang, 'help.commands_title')}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {commands.map((cmd, idx) => (
            <div
              key={cmd.name}
              className="bg-slate-900/40 p-4 md:p-5 rounded-xl border border-slate-800 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/5"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2.5 py-1 rounded text-xs md:text-sm">{cmd.name}</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${cmd.admin ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {cmd.admin ? t(lang, 'help.admin_only') : t(lang, 'help.everyone')}
                </span>
              </div>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{cmd.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={`mb-12 md:mb-16 transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center space-x-3 text-cyan-400">
          <i className="fa-solid fa-star text-lg md:text-xl"></i>
          <span>{t(lang, 'help.features_title')}</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-6">{t(lang, 'help.features_subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 ${feat.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-11 h-11 ${feat.bgColor} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${feat.icon} text-lg ${feat.color}`}></i>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-100 mb-1">{feat.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`mb-12 md:mb-16 transition-all duration-1000 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center space-x-3 text-pink-400">
          <i className="fa-solid fa-circle-exclamation text-lg md:text-xl"></i>
          <span>{t(lang, 'help.faq_title')}</span>
        </h2>
        <FaqAccordion />
      </section>

      {/* CTA */}
      <section className={`text-center py-10 md:py-14 transition-all duration-1000 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-6">{t(lang, 'help.cta_title')}</h2>
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white font-bold text-base md:text-xl rounded-xl shadow-2xl transition duration-300 flex items-center space-x-3 transform group-hover:scale-[1.02]">
            <i className="fa-brands fa-discord text-xl md:text-2xl"></i>
            <span>{t(lang, 'help.cta_button')}</span>
          </a>
        </div>
      </section>

    </main>
  );
}
