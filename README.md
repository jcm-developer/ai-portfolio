# 🤖 AI Portfolio - Jaume Cortés

An interactive AI-powered portfolio that allows visitors to learn about Jaume Cortés through natural conversations. Instead of traditional static sections, users can ask questions to an intelligent assistant that provides personalized responses about projects, experience, skills, and more.

## ✨ Overview

This portfolio reimagines the traditional developer portfolio by leveraging artificial intelligence to create a dynamic, conversational experience. Visitors can interact with an AI assistant trained on Jaume's professional background, making the exploration of his work more engaging and intuitive.

## 🎯 Key Features

### 🗣️ **Conversational Interface**
- Natural language interaction with an AI assistant
- Real-time responses powered by Gradio API
- Typing animation effect for human-like conversation flow
- Ability to stop response generation mid-stream

### 🌍 **Bilingual Support (i18n)**
- Automatic browser language detection (English/Spanish)
- Manual language toggle with persistent preference
- Dynamic content translation without page reload
- Localized suggestions and UI elements

### 🎨 **Modern UI/UX**
- Clean, minimalist design with smooth animations
- Custom cursor effect with trailing circles
- Responsive layout optimized for all devices
- Glassmorphism effects and modern color palette

### 🔗 **Social Integration**
- Fixed sidebar with GitHub and LinkedIn links
- Hover effects and smooth transitions
- Direct access to professional profiles

### 💡 **Smart Suggestions**
- Pre-defined conversation starters
- Context-aware prompts about projects, CV, experience, and skills
- One-click question submission

### 🎭 **Interactive Elements**
- Chat history management
- Delete all conversations option
- Loading states and error handling
- Mobile-optimized controls

## 🛠️ Technology Stack

- **Framework**: [Astro](https://astro.build) - Modern static site generator
- **Styling**: TailwindCSS + Custom CSS
- **AI Integration**: Gradio Client API
- **Internationalization**: Custom i18n implementation
- **Icons**: Material Symbols Outlined
- **Deployment**: Optimized for Vercel/Netlify

## 🎨 Design Philosophy

The portfolio embraces a **conversational-first** approach, breaking away from traditional portfolio structures. Instead of scrolling through sections, visitors engage in a dialogue, asking questions that matter to them. This creates a more memorable and personalized experience while showcasing technical skills through the implementation itself.

## 🌟 Unique Aspects

- **AI-Driven Content Delivery**: Information is served contextually based on user queries
- **No Traditional Sections**: Replaces "About", "Projects", "Contact" with dynamic conversations
- **Persistent Chat History**: Maintains conversation context throughout the session
- **Environment-Based Configuration**: Flexible system prompts via environment variables
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 📱 Responsive Design

Fully responsive across all devices with specific optimizations for:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (< 768px)

## 🔒 Privacy & Security

- Environment variables for sensitive data
- No user data collection or tracking
- Client-side language preferences stored locally
- Secure API communication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/jcm-developer/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and configure your variables (see Configuration section)

# Run development server
npm run dev
```

### Configuration

#### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Required: System message for the AI assistant
PUBLIC_SYSTEM_MESSAGE="Your custom system prompt here"

# Optional: Only needed if your HuggingFace Space is PRIVATE
# PUBLIC_HF_TOKEN="your_huggingface_token"
```

**Important Notes:**
- 🔓 If your HuggingFace Space (`jcm-developer/portfolio-chatbot`) is **public**, you DON'T need `PUBLIC_HF_TOKEN`
- 🔒 If your Space is **private**, uncomment and set `PUBLIC_HF_TOKEN` with a token from https://huggingface.co/settings/tokens
- ⚠️ **NEVER** commit your `.env` file with real tokens to Git (it's already in `.gitignore`)

For detailed security setup and token management, see [SECURITY_STEPS.md](./SECURITY_STEPS.md)

### Available Scripts

```bash
npm run dev      # Start development server at http://localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build locally
```

### Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guidelines.

## 📦 Deployment

### GitHub Pages (Current Setup)

The repository is configured for automatic deployment to GitHub Pages via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Site available at: https://jcm-developer.github.io/my-portfolio/

**Environment Variables in Production:**
- Set `PUBLIC_SYSTEM_MESSAGE` as a GitHub Actions variable
- Set `HF_TOKEN` as a GitHub Actions secret (if needed for private Space)
- Configuration is in `.github/workflows/deploy.yml`

### Alternative Deployment Platforms

This project can also be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder or connect Git
- **Cloudflare Pages**: Connect repository in dashboard

---

**Built with ❤️ by Jaume Cortés** | [GitHub](https://github.com/jcm-developer) | [LinkedIn](https://www.linkedin.com/in/jaume-cortes-monzon-developer/)
