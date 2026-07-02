import { useLanguage } from '../LanguageContext';
import { t } from '../i18n';

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-sm text-slate-500 backdrop-blur-sm">
      <p>{t(lang, 'footer.text')}</p>
    </footer>
  );
}
