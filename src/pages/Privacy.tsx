import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { t } from '../i18n';

export default function Privacy() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const sections = [
    { title: t(lang, 'privacy.s1_title'), text: t(lang, 'privacy.s1_text') },
    { title: t(lang, 'privacy.s2_title'), text: t(lang, 'privacy.s2_text') },
    { title: t(lang, 'privacy.s3_title'), text: t(lang, 'privacy.s3_text') },
    { title: t(lang, 'privacy.s4_title'), text: t(lang, 'privacy.s4_text') },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 md:py-16 flex-grow w-full">
      <h1 className={`text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-violet-400 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {t(lang, 'privacy.title')}
      </h1>

      <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
        <p className={`text-slate-400 transition-all duration-1000 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {t(lang, 'privacy.updated')}
        </p>

        {sections.map((section, idx) => (
          <section
            key={idx}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-100">{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
