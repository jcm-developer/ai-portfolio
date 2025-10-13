export const translations = {
    en: {
        header: {
            subtitle: "Hey, I'm Jaume ",
            title: "AI Portfolio"
        },
        suggestions: [
            "What projects have Jaume worked on?",
            "Could you please provide me with Jaume's CV link?",
            "What are Jaume's studies and experience?",
            "What are Jaume's skills and knowledge?"
        ],
        placeholder: "Ask my assistant about me...",
        buttons: {
            stop: "stop_circle",
            send: "arrow_upward",
            delete: "delete"
        }
    },
    es: {
        header: {
            subtitle: "Hola, soy Jaume ",
            title: "Portfolio IA"
        },
        suggestions: [
            "¿En que proyectos ha trabajado Jaume?",
            "¿Puedes facilitarme el enlace al CV de Jaume?",
            "¿Cuáles son los estudios y experiencia de Jaume?",
            "¿Cuáles son las habilidades y conocimientos de Jaume?"
        ],
        placeholder: "Pregunta a mi asistente sobre mí...",
        buttons: {
            stop: "stop_circle",
            send: "arrow_upward",
            delete: "delete"
        }
    }
};

// Detect browser language
export function getLanguage() {
    if (typeof window === 'undefined') return 'en';
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
}

// Get translation
export function t(lang = 'en') {
    return translations[lang] || translations.en;
}