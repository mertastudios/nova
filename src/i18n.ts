export type Lang = 'en' | 'de';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.features': 'Features & Help',
    'nav.about': 'About & Contact',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',

    // Home
    'home.meet': 'Meet',
    'home.subtitle': 'Your Ultimate Discord AI Chatbot',
    'home.description': 'Nova AI is a powerful, intelligent AI chatbot built for Discord servers. Let your community chat with an AI that truly understands context, remembers conversations, and feels alive.',
    'home.invite': 'Add Nova AI to Your Server',
    'home.benefit1': 'Not just another soulless tool.',
    'home.benefit2': 'Dynamic Server Personalities.',
    'home.benefit3': 'Intelligent Context-Aware Parsing.',
    'home.benefit4': 'Automated API Key Rotation.',
    'home.benefit5': 'Full Multi-Language Support.',
    'home.benefit6': '100% Privacy & On-Leave Wiping.',
    'home.benefit7': 'A real Discord AI companion.',
    'home.discord_chatbot': 'Discord AI Chatbot',
    'home.highlight1_title': 'Built for Discord',
    'home.highlight1_desc': 'Designed from the ground up as a Discord bot — not a generic AI ported over. Nova AI lives in your server and talks like a real member.',
    'home.highlight2_title': 'Completely Free',
    'home.highlight2_desc': 'No premium plans, no paywalls. Every single feature is available for free, forever. Just add it and start chatting.',
    'home.highlight3_title': 'Lightning Fast',
    'home.highlight3_desc': 'Powered by Groq\'s ultra-fast inference. Responses generate in ~1 second — faster than you can blink.',

    // Help
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

    // Features section
    'help.features_title': 'Features',
    'help.features_subtitle': 'Discover what makes Nova AI truly unique among Discord bots.',
    'help.feat1_title': 'Blazing Fast AI Responses',
    'help.feat1_desc': 'Powered by Groq\'s revolutionary inference engine, Nova AI generates complete responses in approximately 1 second. No waiting, no loading screens — instant, natural conversation that keeps up with the speed of your Discord chat.',
    'help.feat2_title': 'Context Understanding & Memory',
    'help.feat2_desc': 'Nova AI doesn\'t just read your last message — it remembers the entire conversation history and understands the context. It even sees user profiles, display names, and roles. Conversations feel natural because Nova actually knows who it\'s talking to.',
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

    // FAQ
    'help.faq_title': 'Troubleshooting & FAQ',
    'help.faq1_q': 'How do we resolve Groq API Rate Limits or "429 Too Many Requests"?',
    'help.faq1_a': 'Nova AI comes standard with built-in Key-Rotation Automation. If you face persistent rate limits, run /manage_api_keys and register multiple keys. The system rotates to a fresh backup instantly when an active token encounters a rate limit block.',
    'help.faq2_q': 'The Bot is online but not reading messages or usernames. Why?',
    'help.faq2_a': 'You likely skipped mandatory Privileged Gateway Intents during creation in the Discord Developer Portal. Access your application profile, navigate to the Bot tab, scroll down, and manually switch on both Message Content Intent and Server Members Intent.',
    'help.faq3_q': 'What is Server Concurrency and why did my warning text disappear?',
    'help.faq3_a': 'To preserve system stability, Nova AI only builds one reply per server simultaneously. If you ping Nova while it\'s already constructing a response, a temporary warning message pings you. For chat security and cleanliness, this alert auto-deletes itself via system scripts exactly 5 seconds later.',

    // CTA
    'help.cta_title': 'Enough reading?',
    'help.cta_button': 'Add Nova AI to Your Server',

    // About
    'about.title_prefix': 'Developed by',
    'about.discord_handle': 'Discord Handle:',
    'about.bio': 'Hey there! I am Merta, a creator specializing in building interactive digital experiences. Nova AI was envisioned as a living, breathing companion for communities rather than a cold algorithmic script runner.',
    'about.collab_title': 'Synergistic AI Development',
    'about.collab_desc': 'This production code infrastructure was completely architected and written in collaboration with',
    'about.youtube': 'Subscribe on YouTube',
    'about.docs': 'Read Documentation',

    // Privacy
    'privacy.title': 'Privacy Policy',
    'privacy.updated': 'Last updated: July 2026',
    'privacy.s1_title': '1. Data Collection Scope',
    'privacy.s1_text': 'Nova AI temporarily stores message strings, user display names, and contextual attachment metadata strictly within active conversations inside your designated text channel or direct pings. This localized history is required to compile multi-turn chat memory structures passed to the Groq processing pipeline.',
    'privacy.s2_title': '2. Encryption Standards',
    'privacy.s2_text': 'All sensitive operational parameters, specifically server administrators\' unique Groq API credentials stored via database configurations, are permanently protected using AES-256 cryptographic encryption layer barriers before hitting database records.',
    'privacy.s3_title': '3. Absolute Erasure Policy',
    'privacy.s3_text': 'We believe in absolute data autonomy. The exact millisecond Nova AI detects a guild departure event (the bot leaves or gets kicked from a server), a system-wide database command cascades to scrub ALL corresponding server configs, chat memories, and API records instantly and permanently.',
    'privacy.s4_title': '4. Third-Party Routing',
    'privacy.s4_text': 'Anonymized contextual scripts are safely evaluated via the Groq processing infrastructure utilizing specified open-source model layers (Llama ecosystem architectures). No text flows or identification datasets are saved, monetized, or shared beyond real-time response building constraints.',

    // Terms
    'terms.title': 'Terms of Service',
    'terms.updated': 'Last updated: July 2026',
    'terms.s1_title': '1. Usage Agreement',
    'terms.s1_text': 'By connecting Nova AI to your public or private guild server channels, you unconditionally validate compliance with Discord\'s broader Developer Terms of Service and general Application usage regulations.',
    'terms.s2_title': '2. Key Ownership & Abuse',
    'terms.s2_text': 'Server administrators are completely accountable for the validation status, traffic costs, or execution scopes of any third-party credential tokens they manually connect via configuration features. Flooding endpoints, reverse-engineering local rotation interfaces, or generating synthetic spam arrays is strictly prohibited.',
    'terms.s3_title': '3. Liability Limits',
    'terms.s3_text': 'Nova AI is supplied to hosting users and community spaces "as-is", without explicitly promised system availability lifespans, runtime warranties, or service maintenance mandates. The core engineering group holds zero liability for operational downtime instances or credential rate-limit locks.',

    // Footer
    'footer.text': '© 2026 Nova AI. Crafted beautifully by Merta. All rights reserved.',
  },

  de: {
    // Navbar
    'nav.home': 'Startseite',
    'nav.features': 'Features & Hilfe',
    'nav.about': 'Über uns & Kontakt',
    'nav.privacy': 'Datenschutz',
    'nav.terms': 'Nutzungsbedingungen',

    // Home
    'home.meet': 'Triff',
    'home.subtitle': 'Dein ultimativer Discord AI Chatbot',
    'home.description': 'Nova AI ist ein leistungsstarker, intelligenter AI-Chatbot für Discord-Server. Lass deine Community mit einer KI chatten, die Kontext wirklich versteht, sich an Gespräche erinnert und sich lebendig anfühlt.',
    'home.invite': 'Nova AI zum Server hinzufügen',
    'home.benefit1': 'Nicht nur ein seelenloses Tool.',
    'home.benefit2': 'Dynamische Server-Persönlichkeiten.',
    'home.benefit3': 'Intelligentes kontextbewusstes Parsing.',
    'home.benefit4': 'Automatische API-Key-Rotation.',
    'home.benefit5': 'Volle Mehrsprachunterstützung.',
    'home.benefit6': '100% Datenschutz & Löschung beim Verlassen.',
    'home.benefit7': 'Ein echter Discord AI Begleiter.',
    'home.discord_chatbot': 'Discord AI Chatbot',
    'home.highlight1_title': 'Für Discord gebaut',
    'home.highlight1_desc': 'Von Grund auf als Discord-Bot konzipiert — keine generische KI, die portiert wurde. Nova AI lebt auf deinem Server und spricht wie ein echtes Mitglied.',
    'home.highlight2_title': 'Komplett kostenlos',
    'home.highlight2_desc': 'Keine Premium-Pläne, keine Paywalls. Jedes einzelne Feature ist für immer kostenlos verfügbar. Einfach hinzufügen und loschatten.',
    'home.highlight3_title': 'Blitzschnell',
    'home.highlight3_desc': 'Angetrieben von Groqs ultraschneller Inferenz. Antworten werden in ~1 Sekunde generiert — schneller als du blinzeln kannst.',

    // Help
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

    // Features section
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

    // FAQ
    'help.faq_title': 'Fehlerbehebung & FAQ',
    'help.faq1_q': 'Wie lösen wir Groq API Rate-Limits oder "429 Too Many Requests"?',
    'help.faq1_a': 'Nova AI kommt standardmäßig mit eingebauter Key-Rotations-Automatisierung. Wenn du anhaltende Rate-Limits hast, führe /manage_api_keys aus und registriere mehrere Keys. Das System rotiert sofort zu einem frischen Backup, wenn ein aktiver Token auf ein Rate-Limit trifft.',
    'help.faq2_q': 'Der Bot ist online, liest aber keine Nachrichten oder Benutzernamen. Warum?',
    'help.faq2_a': 'Du hast wahrscheinlich die obligatorischen Privileged Gateway Intents bei der Erstellung im Discord Developer Portal übersprungen. Greife auf dein Anwendungsprofil zu, navigiere zum Bot-Tab, scrolle nach unten und aktiviere manuell sowohl Message Content Intent als auch Server Members Intent.',
    'help.faq3_q': 'Was ist Server-Konkurrenz und warum ist mein Warntext verschwunden?',
    'help.faq3_a': 'Um die Systemstabilität zu gewährleisten, erstellt Nova AI nur eine Antwort pro Server gleichzeitig. Wenn du Nova pingst, während es bereits eine Antwort erstellt, erscheint eine temporäre Warnnachricht. Für Chat-Sicherheit und Sauberkeit löscht sich diese Warnung automatisch nach genau 5 Sekunden.',

    // CTA
    'help.cta_title': 'Genug gelesen?',
    'help.cta_button': 'Nova AI zum Server hinzufügen',

    // About
    'about.title_prefix': 'Entwickelt von',
    'about.discord_handle': 'Discord-Handle:',
    'about.bio': 'Hey! Ich bin Merta, ein Entwickler, der sich auf interaktive digitale Erlebnisse spezialisiert hat. Nova AI wurde als lebendiger, atmender Begleiter für Communities konzipiert — kein kalter algorithmischer Script-Runner.',
    'about.collab_title': 'Synergetische AI-Entwicklung',
    'about.collab_desc': 'Diese Produktions-Code-Infrastruktur wurde vollständig in Zusammenarbeit mit',
    'about.youtube': 'Auf YouTube abonnieren',
    'about.docs': 'Dokumentation lesen',

    // Privacy
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

    // Terms
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

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] || translations['en'][key] || key;
}
