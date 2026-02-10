// Chat logic ported from Vue to Astro (no framework needed)
import { applyTranslations, initLanguageSwitcher } from "./i18n.js";

let container, chatsContainer, promptForm, promptInput;
let typingInterval, controller;
let isGenerating = false;
const chatHistory = [];
const userData = { message: "", file: {} };

// Helper: create message elements dynamically
const createMsgElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Helper: smooth scroll to bottom of container
const scrollToBottom = () => {
    container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
};

// Typing effect for bot messages
const typingEffect = (text, textElement, botMsgDiv) => {
    textElement.textContent = "";
    const words = text.split(" ");
    let wordIndex = 0;

    typingInterval = setInterval(() => {
        // Check if generation was stopped
        if (!isGenerating) {
            clearInterval(typingInterval);
            botMsgDiv.classList.remove("loading");
            document.body.classList.remove("bot-responding");
            return;
        }

        if (wordIndex < words.length) {
            textElement.textContent += (wordIndex === 0 ? "" : " ") + words[wordIndex++];
            scrollToBottom();
        } else {
            clearInterval(typingInterval);
            botMsgDiv.classList.remove("loading");
            document.body.classList.remove("bot-responding");
            isGenerating = false;
        }
    }, 40);
};

// Generate bot response via OpenAI API call
const generateResponse = async (botMsgDiv) => {
    const textElement = botMsgDiv.querySelector(".message-text");
    controller = new AbortController();
    isGenerating = true;

    // Build messages array for OpenAI
    const messages = [
        { role: "system", content: import.meta.env.PUBLIC_SYSTEM_MESSAGE },
        ...chatHistory,
        { role: "user", content: userData.message },
    ];

    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.PUBLIC_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: import.meta.env.PUBLIC_OPENAI_MODEL || "gpt-4o-mini",
                    messages: messages,
                    max_tokens: 512,
                    temperature: 0.7,
                    top_p: 0.9,
                }),
                signal: controller.signal,
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData?.error?.message || `HTTP error! status: ${response.status}`
            );
        }

        if (!isGenerating) {
            throw new Error("Response generation stopped.");
        }

        const data = await response.json();
        const textResponse = (data.choices?.[0]?.message?.content || "")
            .replace(/\*\*([^*]+)\*\*/g, "$1")
            .trim();

        if (!isGenerating) {
            throw new Error("Response generation stopped.");
        }

        typingEffect(textResponse, textElement, botMsgDiv);

        chatHistory.push({
            role: "user",
            content: userData.message,
        });
        chatHistory.push({
            role: "assistant",
            content: textResponse,
        });
    } catch (error) {
        textElement.style.color = "#d62939";
        textElement.textContent =
            error.message === "Response generation stopped."
                ? "Response generation stopped."
                : error.message;
        botMsgDiv.classList.remove("loading");
        document.body.classList.remove("bot-responding");
        isGenerating = false;
    } finally {
        userData.file = {};
    }
};

// Handle message submission
const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = promptInput.value.trim();
    if (!userMessage || document.body.classList.contains("bot-responding")) return;

    promptInput.value = "";
    userData.message = userMessage;
    document.body.classList.add("bot-responding", "chats-active");

    const userMsgHTML = `
    <p class="message-text"></p>
    ${userData.file.data
            ? userData.file.isImage
                ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />`
                : `<p class="file-attachment">
              <span class="material-symbols-outlined">description</span>
              ${userData.file.fileName}
             </p>`
            : ""
        }
  `;
    const userMsgDiv = createMsgElement(userMsgHTML, "user-message");
    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatsContainer.appendChild(userMsgDiv);
    scrollToBottom();

    // Simulate loading then send request
    setTimeout(() => {
        const botMsgHTML = `
      <img src="${import.meta.env.BASE_URL}img/avatar.png" alt="bot" class="avatar">
      <p class="message-text">Processing...</p>
    `;
        const botMsgDiv = createMsgElement(botMsgHTML, "bot-message", "loading");
        chatsContainer.appendChild(botMsgDiv);
        scrollToBottom();
        generateResponse(botMsgDiv);
    }, 600);
};

// Initialize DOM references and events
window.addEventListener("DOMContentLoaded", () => {
    // Apply translations and initialize language switcher
    applyTranslations();
    initLanguageSwitcher();

    container = document.querySelector(".container") || document.body;
    chatsContainer = document.querySelector(".chats-container");
    promptForm = document.querySelector(".prompt-form");
    promptInput = document.querySelector(".prompt-input");

    // Stop response
    document
        .querySelector("#stop-response-btn")
        ?.addEventListener("click", () => {
            // Immediately stop generation
            isGenerating = false;
            userData.file = {};
            controller?.abort();
            clearInterval(typingInterval);

            // Update UI immediately
            const loadingBot = chatsContainer?.querySelector(".bot-message.loading");
            if (loadingBot) {
                loadingBot.classList.remove("loading");
                const textElement = loadingBot.querySelector(".message-text");
                if (textElement && textElement.textContent === "Processing...") {
                    textElement.style.color = "#d62939";
                    textElement.textContent = "Response generation stopped.";
                }
            }
            document.body.classList.remove("bot-responding");
        });

    // Delete all chats
    document
        .querySelector("#delete-chats-btn")
        ?.addEventListener("click", () => {
            chatHistory.length = 0;
            chatsContainer.innerHTML = "";
            document.body.classList.remove("bot-responding", "chats-active");
        });

    // Handle suggestion clicks
    document.querySelectorAll(".suggestions-item")?.forEach((item) => {
        item.addEventListener("click", () => {
            promptInput.value = item.querySelector(".text").textContent;
            promptForm.dispatchEvent(new Event("submit"));
        });
    });

    // Show/hide controls on mobile
    document.addEventListener("click", ({ target }) => {
        const wrapper = document.querySelector(".prompt-wrapper");
        const shouldHide =
            target.classList.contains("prompt-input") ||
            (wrapper.classList.contains("hide-controls") &&
                (target.id === "add-file-btn" || target.id === "stop-response-btn"));
        wrapper.classList.toggle("hide-controls", shouldHide);
    });

    // Submit handler
    promptForm?.addEventListener("submit", handleFormSubmit);
});
