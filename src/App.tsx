import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

/* ============================================================
   DISCORD INVITE URL - HIER ÄNDERN
   ============================================================ */
const DISCORD_INVITE_URL = 'YOUR_DISCORD_INVITE_URL_HERE';
const YOUTUBE_URL = 'YOUR_YOUTUBE_CHANNEL_URL_HERE';
const DISCORD_USERNAME = 'YOUR_DISCORD_USERNAME_HERE';

/* ============================================================
   ÜBERSETZUNGEN - HIER TEXTE ÄNDERN
   
   So fügst du eine neue Sprache hinzu:
   1. Füge neuen Key zu Lang type: type Lang = 'en' | 'de' | 'fr';
   2. Füge neue Sprache zu LANGUAGES array
   3. Kopiere einen kompletten Sprachblock und übersetze alle Texte
   ============================================================ */
type Lang = 'en' | 'de';

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  // { code: 'fr', flag: '🇫🇷', label: 'Français' }, // Beispiel für neue Sprache
];

const translations: Record<Lang, Record<string, string>> = {
  /* ======================== ENGLISH ======================== */
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features & Help',
    'nav.about': 'About & Contact',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',

    // Home Page
    'home.meet': 'Meet',
    'home.subtitle': 'Your Ultimate Discord AI Chatbot',
    'home.description': 'Nova AI is a powerful, intelligent AI chatbot built for Discord servers. Let your community chat with an AI that truly understands context, remembers conversations, and feels alive.',
    'home.invite': 'Add Nova AI to Your Server',
    'home.discord_chatbot': 'Discord AI Chatbot',
    'home.benefit1': 'Not just another soulless tool.',
    'home.benefit2': 'Dynamic Server Personalities.',
    'home.benefit3': 'Intelligent Context-Aware Parsing.',
    'home.benefit4': 'Automated API Key Rotation.',
    'home.benefit5': 'Full Multi-Language Support.',
    'home.benefit6': '100% Privacy & On-Leave Wiping.',
    'home.benefit7': 'A real Discord AI companion.',
    'home.highlight1_title': 'Built for Discord',
    'home.highlight1_desc': 'Designed from the ground up as a Discord bot — not a generic AI ported over. Nova AI lives in your server and talks like a real member.',
    'home.highlight2_title': 'Completely Free',
    'home.highlight2_desc': 'No premium plans, no paywalls. Every single feature is available for free, forever. Just add it and start chatting.',
    'home.highlight3_title': 'Lightning Fast',
    'home.highlight3_desc': "Powered by Groq's ultra-fast inference. Responses generate in ~1 second — faster than you can blink.",

    // Help Page - Commands
    'help.title': 'Features & Commands',
    'help.subtitle': 'Master Nova AI. Explore its powerful features, configuration commands, and diagnostic solutions below.',
    'help.commands_title': 'Slash Commands',
    'help.admin_only': 'Admin Only',
    'help.everyone': 'Everyone',
    'help.cmd_set_channel': 'Designates an automated AI chat channel. Inside this channel, Nova AI responds instantly to every message without needing a ping.',
    'help.cmd_edit_personality': 'Switches the AI personality template (e.g., Gamer Nerd, Dramatic Diva) or opens a custom modal form for custom prompts.',
    'help.cmd_manage_api_keys': 'Opens an ephemeral control panel to register, delete, or rotate multiple Groq API keys with built-in localized tutorials.',
    'help.cmd_set_language': 'Changes the global localization setting (English or German supported out of the box). Updates embed styles and prompt handling.',
    'help.cmd_reset_chat_history': 'Wipes the conversational memory buffer completely clean for the active server channel to start a fresh sequence.',
    'help.cmd_feedback': 'Launches a direct developer modal interface. Submissions safely route straight to Merta. Global 3-hour cooldown applies per user.',

    // Help Page - Features
    'help.features_title': 'Features',
    'help.features_subtitle': 'Discover what makes Nova AI truly unique among Discord bots.',
    'help.feat1_title': 'Blazing Fast AI Responses',
    'help.feat1_desc': "Powered by Groq's revolutionary inference engine, Nova AI generates complete responses in approximately 1 second. No waiting, no loading screens — instant, natural conversation that keeps up with the speed of your Discord chat.",
    'help.feat2_title': 'Context Understanding & Memory',
    'help.feat2_desc': "Nova AI doesn't just read your last message — it remembers the entire conversation history and understands the context. It even sees user profiles, display names, and roles. Conversations feel natural because Nova actually knows who it's talking to.",
    'help.feat3_title': 'Fully Custom Personality',
    'help.feat3_desc': 'Make Nova AI act like anyone or anything. From a sarcastic pirate to a helpful study buddy — the personality system lets you write completely custom behavior prompts. Your server, your rules, your AI personality.',
    'help.feat4_title': '100% Free — No Premium',
    'help.feat4_desc': 'Every single feature is completely free. There is no premium version, no paywall, no hidden costs. All users get full access to every capability Nova AI offers. Forever.',
    'help.feat5_title': 'Understands All Attachments',
    'help.feat5_desc': 'Send stickers, emojis, images, videos, files, or even voice messages — Nova AI understands them all. It processes and responds to any type of Discord attachment intelligently, making conversations richer and more interactive.',
    'help.feat6_title': 'Multi-Key API Rotation',
    'help.feat6_desc': 'Register multiple Groq API keys from different accounts. Nova AI automatically rotates between them when one hits a rate limit, giving your server significantly more free usage without any manual intervention.',
    'help.feat7_title': 'Simple Setup via Commands',
    'help.feat7_desc': 'No complicated dashboards or web panels required. Everything is configured directly through Discord slash commands. Set up your channel, personality, API keys, and language — all without leaving Discord.',

    // Help Page - FAQ
    'help.faq_title': 'Troubleshooting & FAQ',
    'help.faq1_q': 'How do we resolve Groq API Rate Limits or "429 Too Many Requests"?',
    'help.faq1_a': 'Nova AI comes standard with built-in Key-Rotation Automation. If you face persistent rate limits, run /manage_api_keys and register multiple keys. The system rotates to a fresh backup instantly when an active token encounters a rate limit block.',
    'help.faq2_q': 'The Bot is online but not reading messages or usernames. Why?',
    'help.faq2_a': 'You likely skipped mandatory Privileged Gateway Intents during creation in the Discord Developer Portal. Access your application profile, navigate to the Bot tab, scroll down, and manually switch on both Message Content Intent and Server Members Intent.',
    'help.faq3_q': 'What is Server Concurrency and why did my warning text disappear?',
    'help.faq3_a': "To preserve system stability, Nova AI only builds one reply per server simultaneously. If you ping Nova while it's already constructing a response, a temporary warning message pings you. For chat security and cleanliness, this alert auto-deletes itself via system scripts exactly 5 seconds later.",
    'help.cta_title': 'Enough reading?',
    'help.cta_button': 'Add Nova AI to Your Server',

    // About Page
    'about.title_prefix': 'Developed by',
    'about.discord_handle': 'Discord Handle:',
    'about.bio': 'Hey there! I am Merta, a creator specializing in building interactive digital experiences. Nova AI was envisioned as a living, breathing companion for communities rather than a cold algorithmic script runner.',
    'about.collab_title': 'Synergistic AI Development',
    'about.collab_desc': 'This production code infrastructure was completely architected and written in collaboration with',
    'about.youtube': 'Subscribe on YouTube',
    'about.docs': 'Read Documentation',

    // Privacy Page
    'privacy.title': 'Privacy Policy',
    'privacy.updated': 'Last updated: July 2026',
    'privacy.s1_title': '1. Data Collection Scope',
    'privacy.s1_text': 'Nova AI temporarily stores message strings, user display names, and contextual attachment metadata strictly within active conversations inside your designated text channel or direct pings. This localized history is required to compile multi-turn chat memory structures passed to the Groq processing pipeline.',
    'privacy.s2_title': '2. Encryption Standards',
    'privacy.s2_text': "All sensitive operational parameters, specifically server administrators' unique Groq API credentials stored via database configurations, are permanently protected using AES-256 cryptographic encryption layer barriers before hitting database records.",
    'privacy.s3_title': '3. Absolute Erasure Policy',
    'privacy.s3_text': 'We believe in absolute data autonomy. The exact millisecond Nova AI detects a guild departure event (the bot leaves or gets kicked from a server), a system-wide database command cascades to scrub ALL corresponding server configs, chat memories, and API records instantly and permanently.',
    'privacy.s4_title': '4. Third-Party Routing',
    'privacy.s4_text': 'Anonymized contextual scripts are safely evaluated via the Groq processing infrastructure utilizing specified open-source model layers (Llama ecosystem architectures). No text flows or identification datasets are saved, monetized, or shared beyond real-time response building constraints.',

    // Terms Page
    'terms.title': 'Terms of Service',
    'terms.updated': 'Last updated: July 2026',
    'terms.s1_title': '1. Usage Agreement',
    'terms.s1_text': "By connecting Nova AI to your public or private guild server channels, you unconditionally validate compliance with Discord's broader Developer Terms of Service and general Application usage regulations.",
    'terms.s2_title': '2. Key Ownership & Abuse',
    'terms.s2_text': 'Server administrators are completely accountable for the validation status, traffic costs, or execution scopes of any third-party credential tokens they manually connect via configuration features. Flooding endpoints, reverse-engineering local rotation interfaces, or generating synthetic spam arrays is strictly prohibited.',
    'terms.s3_title': '3. Liability Limits',
    'terms.s3_text': 'Nova AI is supplied to hosting users and community spaces "as-is", without explicitly promised system availability lifespans, runtime warranties, or service maintenance mandates. The core engineering group holds zero liability for operational downtime instances or credential rate-limit locks.',

    // Footer
    'footer.text': '© 2026 Nova AI. Crafted beautifully by Merta. All rights reserved.',
  },

  /* ======================== DEUTSCH ======================== */
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.features': 'Features & Hilfe',
    'nav.about': 'Über uns & Kontakt',
    'nav.privacy': 'Datenschutz',
    'nav.terms': 'Nutzungsbedingungen',

    // Home Page
    'home.meet': 'Triff',
    'home.subtitle': 'Dein ultimativer Discord AI Chatbot',
    'home.description': 'Nova AI ist ein leistungsstarker, intelligenter AI-Chatbot für Discord-Server. Lass deine Community mit einer KI chatten, die Kontext wirklich versteht, sich an Gespräche erinnert und sich lebendig anfühlt.',
    'home.invite': 'Nova AI zum Server hinzufügen',
    'home.discord_chatbot': 'Discord AI Chatbot',
    'home.benefit1': 'Nicht nur ein seelenloses Tool.',
    'home.benefit2': 'Dynamische Server-Persönlichkeiten.',
    'home.benefit3': 'Intelligentes kontextbewusstes Parsing.',
    'home.benefit4': 'Automatische API-Key-Rotation.',
    'home.benefit5': 'Volle Mehrsprachunterstützung.',
    'home.benefit6': '100% Datenschutz & Löschung beim Verlassen.',
    'home.benefit7': 'Ein echter Discord AI Begleiter.',
    'home.highlight1_title': 'Für Discord gebaut',
    'home.highlight1_desc': 'Von Grund auf als Discord-Bot konzipiert — keine generische KI, die portiert wurde. Nova AI lebt auf deinem Server und spricht wie ein echtes Mitglied.',
    'home.highlight2_title': 'Komplett kostenlos',
    'home.highlight2_desc': 'Keine Premium-Pläne, keine Paywalls. Jedes einzelne Feature ist für immer kostenlos verfügbar. Einfach hinzufügen und loschatten.',
    'home.highlight3_title': 'Blitzschnell',
    'home.highlight3_desc': 'Angetrieben von Groqs ultraschneller Inferenz. Antworten werden in ~1 Sekunde generiert — schneller als du blinzeln kannst.',

    // Help Page - Commands
    'help.title': 'Features & Befehle',
    'help.subtitle': 'Meistere Nova AI. Entdecke die leistungsstarken Features, Konfigurationsbefehle und Diagnoselösungen.',
    'help.commands_title': 'Slash-Befehle',
    'help.admin_only': 'Nur Admins',
    'help.everyone': 'Jeder',
    'help.cmd_set_channel': 'Legt einen automatisierten AI-Chat-Kanal fest. In diesem Kanal antwortet Nova AI sofort auf jede Nachricht, ohne dass ein Ping nötig ist.',
    'help.cmd_edit_personality': 'Wechselt die AI-Persönlichkeitsvorlage (z.B. Gamer Nerd, Dramatische Diva) oder öffnet ein benutzerdefiniertes Modal für eigene Prompts.',
    'help.cmd_manage_api_keys': 'Öffnet ein ephemeres Kontrollpanel zum Registrieren, Löschen oder Rotieren mehrerer Groq API-Keys mit integrierten lokalisierten Tutorials.',
    'help.cmd_set_language': 'Ändert die globale Spracheinstellung (Englisch oder Deutsch sofort verfügbar). Aktualisiert Embed-Stile und Prompt-Verarbeitung.',
    'help.cmd_reset_chat_history': 'Löscht den Gesprächsspeicher vollständig für den aktiven Server-Kanal, um eine neue Sequenz zu starten.',
    'help.cmd_feedback': 'Startet eine direkte Entwickler-Modal-Oberfläche. Einsendungen werden sicher direkt an Merta weitergeleitet. Globaler 3-Stunden-Cooldown pro Benutzer.',

    // Help Page - Features
    'help.features_title': 'Features',
    'help.features_subtitle': 'Entdecke, was Nova AI unter Discord-Bots wirklich einzigartig macht.',
    'help.feat1_title': 'Blitzschnelle AI-Antworten',
    'help.feat1_desc': 'Angetrieben von Groqs revolutionärer Inferenz-Engine generiert Nova AI vollständige Antworten in etwa 1 Sekunde. Kein Warten, keine Ladebildschirme — sofortige, natürliche Konversation, die mit der Geschwindigkeit deines Discord-Chats mithält.',
    'help.feat2_title': 'Kontextverständnis & Erinnerung',
    'help.feat2_desc': 'Nova AI liest nicht nur deine letzte Nachricht — es erinnert sich an den gesamten Chatverlauf und versteht den Kontext. Es sieht sogar Benutzerprofile, Anzeigenamen und Rollen. Gespräche fühlen sich natürlich an, weil Nova wirklich weiß, mit wem es spricht.',
    'help.feat3_title': 'Komplett anpassbare Persönlichkeit',
    'help.feat3_desc': 'Lass Nova AI wie jemanden oder etwas beliebiges agieren. Von einem sarkastischen Piraten bis zu einem hilfreichen Lernpartner — das Persönlichkeitssystem erlaubt komplett benutzerdefinierte Verhaltens-Prompts. Dein Server, deine Regeln, deine AI-Persönlichkeit.',
    'help.feat4_title': '100% Kostenlos — Kein Premium',
    'help.feat4_desc': 'Jedes einzelne Feature ist komplett kostenlos. Es gibt keine Premium-Version, keine Paywall, keine versteckten Kosten. Alle Nutzer haben vollen Zugang zu jeder Funktion, die Nova AI bietet. Für immer.',
    'help.feat5_title': 'Versteht alle Anhänge',
    'help.feat5_desc': 'Sende Sticker, Emojis, Bilder, Videos, Dateien oder sogar Sprachnachrichten — Nova AI versteht sie alle. Es verarbeitet und reagiert intelligent auf jede Art von Discord-Anhang und macht Gespräche reichhaltiger und interaktiver.',
    'help.feat6_title': 'Multi-Key API-Rotation',
    'help.feat6_desc': 'Registriere mehrere Groq API-Keys von verschiedenen Accounts. Nova AI wechselt automatisch zwischen ihnen, wenn einer ein Rate-Limit erreicht, und gibt deinem Server deutlich mehr kostenlose Nutzung ohne manuelles Eingreifen.',
    'help.feat7_title': 'Einfache Einrichtung über Befehle',
    'help.feat7_desc': 'Keine komplizierten Dashboards oder Web-Panels nötig. Alles wird direkt über Discord-Slash-Befehle konfiguriert. Richte deinen Kanal, Persönlichkeit, API-Keys und Sprache ein — alles ohne Discord zu verlassen.',

    // Help Page - FAQ
    'help.faq_title': 'Fehlerbehebung & FAQ',
    'help.faq1_q': 'Wie lösen wir Groq API Rate-Limits oder "429 Too Many Requests"?',
    'help.faq1_a': 'Nova AI kommt standardmäßig mit eingebauter Key-Rotations-Automatisierung. Wenn du anhaltende Rate-Limits hast, führe /manage_api_keys aus und registriere mehrere Keys. Das System rotiert sofort zu einem frischen Backup, wenn ein aktiver Token auf ein Rate-Limit trifft.',
    'help.faq2_q': 'Der Bot ist online, liest aber keine Nachrichten oder Benutzernamen. Warum?',
    'help.faq2_a': 'Du hast wahrscheinlich die obligatorischen Privileged Gateway Intents bei der Erstellung im Discord Developer Portal übersprungen. Greife auf dein Anwendungsprofil zu, navigiere zum Bot-Tab, scrolle nach unten und aktiviere manuell sowohl Message Content Intent als auch Server Members Intent.',
    'help.faq3_q': 'Was ist Server-Konkurrenz und warum ist mein Warntext verschwunden?',
    'help.faq3_a': 'Um die Systemstabilität zu gewährleisten, erstellt Nova AI nur eine Antwort pro Server gleichzeitig. Wenn du Nova pingst, während es bereits eine Antwort erstellt, erscheint eine temporäre Warnnachricht. Für Chat-Sicherheit und Sauberkeit löscht sich diese Warnung automatisch nach genau 5 Sekunden.',
    'help.cta_title': 'Genug gelesen?',
    'help.cta_button': 'Nova AI zum Server hinzufügen',

    // About Page
    'about.title_prefix': 'Entwickelt von',
    'about.discord_handle': 'Discord-Handle:',
    'about.bio': 'Hey! Ich bin Merta, ein Entwickler, der sich auf interaktive digitale Erlebnisse spezialisiert hat. Nova AI wurde als lebendiger, atmender Begleiter für Communities konzipiert — kein kalter algorithmischer Script-Runner.',
    'about.collab_title': 'Synergetische AI-Entwicklung',
    'about.collab_desc': 'Diese Produktions-Code-Infrastruktur wurde vollständig in Zusammenarbeit mit',
    'about.youtube': 'Auf YouTube abonnieren',
    'about.docs': 'Dokumentation lesen',

    // Privacy Page
    'privacy.title': 'Datenschutzrichtlinie',
    'privacy.updated': 'Zuletzt aktualisiert: Juli 2026',
    'privacy.s1_title': '1. Umfang der Datenerhebung',
    'privacy.s1_text': 'Nova AI speichert temporär Nachrichtenstrings, Benutzer-Anzeigenamen und kontextuelle Anhang-Metadaten ausschließlich innerhalb aktiver Gespräche in deinem festgelegten Textkanal oder bei direkten Pings. Dieser lokalisierte Verlauf wird benötigt, um Multi-Turn-Chat-Speicherstrukturen zu kompilieren, die an die Groq-Verarbeitungspipeline übergeben werden.',
    'privacy.s2_title': '2. Verschlüsselungsstandards',
    'privacy.s2_text': 'Alle sensiblen Betriebsparameter, insbesondere die einzigartigen Groq API-Anmeldedaten der Serveradministratoren, die über Datenbankkonfigurationen gespeichert werden, sind permanent durch AES-256 kryptographische Verschlüsselungsschichten geschützt, bevor sie in Datenbankeinträge geschrieben werden.',
    'privacy.s3_title': '3. Absolute Löschrichtlinie',
    'privacy.s3_text': 'Wir glauben an absolute Datenautonomie. In der exakten Millisekunde, in der Nova AI ein Guild-Departure-Event erkennt (der Bot verlässt den Server oder wird gekickt), kaskadiert ein systemweiter Datenbankbefehl, um ALLE entsprechenden Serverkonfigurationen, Chat-Erinnerungen und API-Einträge sofort und dauerhaft zu löschen.',
    'privacy.s4_title': '4. Drittanbieter-Routing',
    'privacy.s4_text': 'Anonymisierte kontextuelle Skripte werden sicher über die Groq-Verarbeitungsinfrastruktur ausgewertet, die spezifizierte Open-Source-Modellschichten (Llama-Ökosystem-Architekturen) nutzt. Keine Textflüsse oder Identifikationsdatensätze werden über die Echtzeit-Antwortgenerierung hinaus gespeichert, monetarisiert oder geteilt.',

    // Terms Page
    'terms.title': 'Nutzungsbedingungen',
    'terms.updated': 'Zuletzt aktualisiert: Juli 2026',
    'terms.s1_title': '1. Nutzungsvereinbarung',
    'terms.s1_text': 'Durch die Verbindung von Nova AI mit deinen öffentlichen oder privaten Guild-Server-Kanälen bestätigst du bedingungslos die Einhaltung von Discords allgemeinen Entwickler-Nutzungsbedingungen und allgemeinen Anwendungsnutzungsvorschriften.',
    'terms.s2_title': '2. Key-Eigentum & Missbrauch',
    'terms.s2_text': 'Serveradministratoren sind vollständig verantwortlich für den Validierungsstatus, die Verkehrskosten oder den Ausführungsumfang aller Drittanbieter-Anmeldedaten, die sie manuell über Konfigurationsfunktionen verbinden. Das Überfluten von Endpunkten, Reverse-Engineering lokaler Rotationsschnittstellen oder das Erzeugen synthetischer Spam-Arrays ist streng verboten.',
    'terms.s3_title': '3. Haftungsbeschränkungen',
    'terms.s3_text': 'Nova AI wird den Hosting-Benutzern und Community-Räumen "wie besehen" zur Verfügung gestellt, ohne ausdrücklich zugesagte Systemverfügbarkeitszeiten, Laufzeitgarantien oder Service-Wartungsmandate. Die Kernentwicklungsgruppe übernimmt keinerlei Haftung für betriebliche Ausfallzeiten oder Credential-Rate-Limit-Sperren.',

    // Footer
    'footer.text': '© 2026 Nova AI. Liebevoll gestaltet von Merta. Alle Rechte vorbehalten.',
  },
};

/* ============================================================
   FAQ FRAGEN - HIER ANPASSEN
   ============================================================ */
function getFaqItems(lang: Lang) {
  return [
    { q: translations[lang]['help.faq1_q'], a: translations[lang]['help.faq1_a'] },
    { q: translations[lang]['help.faq2_q'], a: translations[lang]['help.faq2_a'] },
    { q: translations[lang]['help.faq3_q'], a: translations[lang]['help.faq3_a'] },
  ];
}

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */
function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] || translations['en'][key] || key;
}

/* ============================================================
   LANGUAGE CONTEXT
   ============================================================ */
const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} });
function useLanguage() { return useContext(LanguageContext); }

/* ============================================================
   NAVBAR COMPONENT
   ============================================================ */
function Navbar() {
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { path: '/', label: t(lang, 'nav.home'), icon: 'fa-solid fa-house' },
    { path: '/help', label: t(lang, 'nav.features'), icon: 'fa-solid fa-circle-question' },
    { path: '/about', label: t(lang, 'nav.about'), icon: 'fa-solid fa-user' },
    { path: '/privacy', label: t(lang, 'nav.privacy'), icon: 'fa-solid fa-shield-halved' },
    { path: '/terms', label: t(lang, 'nav.terms'), icon: 'fa-solid fa-file-contract' },
  ];

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <>
      <nav className="border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-300 hover:text-violet-400 transition-colors p-1" aria-label="Toggle menu">
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <span className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                <span className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-wider hover:opacity-90 transition">
              <span className="text-2xl animate-pulse">🌙</span>
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Nova AI</span>
            </Link>
          </div>
          <div ref={langRef} className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center space-x-1.5 text-slate-300 hover:text-violet-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50" aria-label="Switch language">
              <span className="text-xl">{currentLang.flag}</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden min-w-[160px] animate-fadeIn z-50">
                {LANGUAGES.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors hover:bg-slate-800 ${lang === l.code ? 'text-violet-400 bg-slate-800/50' : 'text-slate-300'}`}>
                    <span className="text-lg">{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && <i className="fa-solid fa-check ml-auto text-violet-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuOpen(false)} />
      <div className={`fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-slate-950 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌙</span>
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold text-lg">Nova AI</span>
          </div>
          <button onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-violet-400 transition-colors p-2" aria-label="Close menu">
            <i className="fa-solid fa-xmark text-xl" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          {navLinks.map((link, idx) => (
            <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive(link.path) ? 'text-violet-400 bg-violet-500/10 border-l-2 border-violet-400' : 'text-slate-400 hover:text-violet-400 hover:bg-slate-800/50'}`} style={{ transitionDelay: menuOpen ? `${idx * 50}ms` : '0ms' }}>
              <i className={`${link.icon} w-5 text-center`} />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">© 2026 Nova AI by Merta</p>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   FOOTER COMPONENT
   ============================================================ */
function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-sm text-slate-500 backdrop-blur-sm flex-shrink-0">
      <p>{t(lang, 'footer.text')}</p>
    </footer>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function Home() {
  const { lang } = useLanguage();
  const [benefitIndex, setBenefitIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  const benefits = [
    t(lang, 'home.benefit1'), t(lang, 'home.benefit2'), t(lang, 'home.benefit3'),
    t(lang, 'home.benefit4'), t(lang, 'home.benefit5'), t(lang, 'home.benefit6'), t(lang, 'home.benefit7'),
  ];

  useEffect(() => {
    setHeroVisible(true);
    const timer = setTimeout(() => setCardsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setBenefitIndex((prev) => (prev + 1) % benefits.length); setVisible(true); }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, [benefits.length]);

  return (
    <div className="relative">
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-violet-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-cyan-900/20 rounded-full blur-[150px] pointer-events-none" />
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center justify-center text-center relative z-10">
        <div className={`relative mb-8 md:mb-10 group transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full blur-2xl opacity-40 animate-glow" />
          <div className="w-28 h-28 md:w-40 md:h-40 bg-slate-900/90 border-2 border-violet-500/40 rounded-full flex items-center justify-center text-5xl md:text-7xl shadow-2xl animate-float transition-all duration-300 group-hover:border-cyan-400/60">🌙</div>
        </div>
        <div className={`transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center space-x-2 bg-indigo-950/60 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-5 text-sm">
            <i className="fa-brands fa-discord text-indigo-400" />
            <span className="text-indigo-300 font-medium">{t(lang, 'home.discord_chatbot')}</span>
          </span>
        </div>
        <h1 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {t(lang, 'home.meet')} <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Nova AI</span>
        </h1>
        <p className={`text-lg md:text-xl text-slate-400 max-w-2xl mb-4 transition-all duration-1000 delay-400 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{t(lang, 'home.subtitle')}</p>
        <p className={`text-sm md:text-base text-slate-500 max-w-xl mb-8 leading-relaxed transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{t(lang, 'home.description')}</p>
        <div className={`h-12 md:h-16 flex items-center justify-center mb-10 transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`text-lg md:text-2xl font-medium font-mono transition-all duration-500 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{benefits[benefitIndex]}</p>
        </div>
        <div className={`relative group mb-16 transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300" />
          <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className="relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white font-bold text-base md:text-xl rounded-xl shadow-2xl transition duration-300 flex items-center space-x-3 transform group-hover:scale-[1.02]">
            <i className="fa-brands fa-discord text-xl md:text-2xl" />
            <span>{t(lang, 'home.invite')}</span>
          </a>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 group">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><i className="fa-brands fa-discord text-2xl text-violet-400" /></div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{t(lang, 'home.highlight1_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t(lang, 'home.highlight1_desc')}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 group">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><i className="fa-solid fa-gift text-2xl text-cyan-400" /></div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{t(lang, 'home.highlight2_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t(lang, 'home.highlight2_desc')}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10 group">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><i className="fa-solid fa-bolt text-2xl text-pink-400" /></div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{t(lang, 'home.highlight3_title')}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t(lang, 'home.highlight3_desc')}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   HELP PAGE
   ============================================================ */
function FaqAccordion() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqItems = getFaqItems(lang);
  return (
    <div className="space-y-3">
      {faqItems.map((item, idx) => (
        <div key={idx} className={`bg-slate-900/40 border rounded-xl overflow-hidden transition-all duration-500 ${openIndex === idx ? 'border-pink-500/30 shadow-lg shadow-pink-500/5' : 'border-slate-800'}`}>
          <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center p-4 md:p-5 text-left font-medium text-slate-200 hover:bg-slate-800/30 transition-colors duration-200">
            <span className="pr-4 text-sm md:text-base">{item.q}</span>
            <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 text-sm shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} />
          </button>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 md:p-5 border-t border-slate-800/80 bg-slate-950/40 text-slate-300 text-sm leading-relaxed">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Help() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const commands = [
    { name: '/set_channel', admin: true, desc: t(lang, 'help.cmd_set_channel') },
    { name: '/edit_personality', admin: true, desc: t(lang, 'help.cmd_edit_personality') },
    { name: '/manage_api_keys', admin: true, desc: t(lang, 'help.cmd_manage_api_keys') },
    { name: '/set_language', admin: true, desc: t(lang, 'help.cmd_set_language') },
    { name: '/reset_chat_history', admin: true, desc: t(lang, 'help.cmd_reset_chat_history') },
    { name: '/feedback', admin: false, desc: t(lang, 'help.cmd_feedback') },
  ];

  const features = [
    { icon: 'fa-solid fa-bolt', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500/40', title: t(lang, 'help.feat1_title'), desc: t(lang, 'help.feat1_desc') },
    { icon: 'fa-solid fa-brain', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'hover:border-violet-500/40', title: t(lang, 'help.feat2_title'), desc: t(lang, 'help.feat2_desc') },
    { icon: 'fa-solid fa-masks-theater', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/40', title: t(lang, 'help.feat3_title'), desc: t(lang, 'help.feat3_desc') },
    { icon: 'fa-solid fa-heart', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/40', title: t(lang, 'help.feat4_title'), desc: t(lang, 'help.feat4_desc') },
    { icon: 'fa-solid fa-paperclip', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'hover:border-cyan-500/40', title: t(lang, 'help.feat5_title'), desc: t(lang, 'help.feat5_desc') },
    { icon: 'fa-solid fa-rotate', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/40', title: t(lang, 'help.feat6_title'), desc: t(lang, 'help.feat6_desc') },
    { icon: 'fa-solid fa-terminal', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'hover:border-indigo-500/40', title: t(lang, 'help.feat7_title'), desc: t(lang, 'help.feat7_desc') },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 md:py-12 w-full">
      <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">{t(lang, 'help.title')}</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">{t(lang, 'help.subtitle')}</p>
      </div>
      <section className={`mb-12 md:mb-16 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center space-x-3 text-violet-400"><i className="fa-solid fa-terminal text-lg md:text-xl" /><span>{t(lang, 'help.commands_title')}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {commands.map((cmd) => (
            <div key={cmd.name} className="bg-slate-900/40 p-4 md:p-5 rounded-xl border border-slate-800 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/5">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2.5 py-1 rounded text-xs md:text-sm">{cmd.name}</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${cmd.admin ? 'text-rose-400' : 'text-emerald-400'}`}>{cmd.admin ? t(lang, 'help.admin_only') : t(lang, 'help.everyone')}</span>
              </div>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{cmd.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={`mb-12 md:mb-16 transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center space-x-3 text-cyan-400"><i className="fa-solid fa-star text-lg md:text-xl" /><span>{t(lang, 'help.features_title')}</span></h2>
        <p className="text-slate-400 text-sm md:text-base mb-6">{t(lang, 'help.features_subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <div key={idx} className={`bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 ${feat.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group`}>
              <div className="flex items-start space-x-4">
                <div className={`w-11 h-11 ${feat.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}><i className={`${feat.icon} text-lg ${feat.color}`} /></div>
                <div><h3 className="text-base md:text-lg font-bold text-slate-100 mb-1">{feat.title}</h3><p className="text-slate-400 text-xs md:text-sm leading-relaxed">{feat.desc}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={`mb-12 md:mb-16 transition-all duration-1000 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center space-x-3 text-pink-400"><i className="fa-solid fa-circle-exclamation text-lg md:text-xl" /><span>{t(lang, 'help.faq_title')}</span></h2>
        <FaqAccordion />
      </section>
      <section className={`text-center py-10 md:py-14 transition-all duration-1000 delay-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-6">{t(lang, 'help.cta_title')}</h2>
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300" />
          <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className="relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white font-bold text-base md:text-xl rounded-xl shadow-2xl transition duration-300 flex items-center space-x-3 transform group-hover:scale-[1.02]">
            <i className="fa-brands fa-discord text-xl md:text-2xl" />
            <span>{t(lang, 'help.cta_button')}</span>
          </a>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   ABOUT PAGE
   ============================================================ */
function About() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 md:py-16 flex flex-col items-center justify-center">
      <div className={`bg-slate-900/50 border border-slate-800 p-6 md:p-12 rounded-3xl w-full text-center relative overflow-hidden backdrop-blur-sm transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 rounded-full" />
        <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-full mx-auto flex items-center justify-center text-3xl md:text-4xl font-extrabold text-white shadow-xl mb-6 animate-float">M</div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide mb-2">{t(lang, 'about.title_prefix')} <span className="text-violet-400">Merta</span></h1>
        <p className="text-slate-400 font-mono text-xs md:text-sm mb-6 flex items-center justify-center space-x-1.5 flex-wrap"><i className="fa-brands fa-discord text-indigo-400" /><span>{t(lang, 'about.discord_handle')} <strong className="text-slate-200">{DISCORD_USERNAME}</strong></span></p>
        <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-sm md:text-base">{t(lang, 'about.bio')}</p>
        <div className="inline-flex items-center space-x-3 bg-violet-950/60 border border-violet-800/50 rounded-2xl px-4 md:px-5 py-3 mb-10 max-w-md text-left">
          <i className="fa-solid fa-wand-magic-sparkles text-lg md:text-xl text-pink-400 shrink-0" />
          <p className="text-xs text-violet-200 leading-normal"><strong className="text-white block font-semibold mb-0.5">{t(lang, 'about.collab_title')}</strong>{t(lang, 'about.collab_desc')} <span className="text-cyan-400 font-bold">Claude</span>.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02] hover:shadow-red-500/20"><i className="fa-brands fa-youtube" /><span>{t(lang, 'about.youtube')}</span></a>
          <Link to="/help" className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-700 hover:scale-[1.02]"><i className="fa-solid fa-book" /><span>{t(lang, 'about.docs')}</span></Link>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   PRIVACY PAGE
   ============================================================ */
function Privacy() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const sections = [
    { title: t(lang, 'privacy.s1_title'), text: t(lang, 'privacy.s1_text') },
    { title: t(lang, 'privacy.s2_title'), text: t(lang, 'privacy.s2_text') },
    { title: t(lang, 'privacy.s3_title'), text: t(lang, 'privacy.s3_text') },
    { title: t(lang, 'privacy.s4_title'), text: t(lang, 'privacy.s4_text') },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 md:py-16 w-full">
      <h1 className={`text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-violet-400 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{t(lang, 'privacy.title')}</h1>
      <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
        <p className={`text-slate-400 transition-all duration-1000 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>{t(lang, 'privacy.updated')}</p>
        {sections.map((section, idx) => (
          <section key={idx} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${(idx + 1) * 150}ms` }}>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-100">{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}

/* ============================================================
   TERMS PAGE
   ============================================================ */
function Terms() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const sections = [
    { title: t(lang, 'terms.s1_title'), text: t(lang, 'terms.s1_text') },
    { title: t(lang, 'terms.s2_title'), text: t(lang, 'terms.s2_text') },
    { title: t(lang, 'terms.s3_title'), text: t(lang, 'terms.s3_text') },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 md:py-16 w-full">
      <h1 className={`text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-cyan-400 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{t(lang, 'terms.title')}</h1>
      <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
        <p className={`text-slate-400 transition-all duration-1000 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>{t(lang, 'terms.updated')}</p>
        {sections.map((section, idx) => (
          <section key={idx} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${(idx + 1) * 150}ms` }}>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-100">{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}

/* ============================================================
   SCROLL TO TOP ON ROUTE CHANGE
   ============================================================ */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ============================================================
   APP CONTENT WRAPPER
   ============================================================ */
function AppContent() {
  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-violet-500 selection:text-white">
      <Navbar />
      <ScrollToTop />
      <div className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

/* ============================================================
   MAIN APP EXPORT
   ============================================================ */
export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </LanguageContext.Provider>
  );
}
