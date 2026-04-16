<h1 align="center">
  <br>
  ⚡ RESCUE-NET
  <br>
</h1>

<h4 align="center">An Intelligent, Multi-Agent Emergency Response Network</h4>
<p align="center"><em>Phase 3 Hackathon Prototype</em></p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#dynamic-features">Features</a> •
  <a href="#-file-structure">Structure</a> •
  <a href="#-agent-workflows">Workflows</a> •
  <a href="#-how-to-use-local-setup">Setup</a>
</p>

---

## 🌎 Overview

**RESCUE-NET** is an advanced, AI-driven emergency response coordinator designed to drastically reduce response times during critical medical or physical emergencies. Rather than relying on immediate human routing delays, the system acts as a **Central Decision-Making Brain**, mapping inputs to distinct AI background sub-agents for instantaneous action.

This repository holds the **Phase 3 Concept Application**, showcasing a highly-polished Glassmorphic interface, native 3D interactivity, and multi-language support necessary for rapid on-site assistance.

## 🚀 Dynamic Features

- **Native NLP Triage (English, Hindi, Kannada):** The AI listens and synthesizes speech seamlessly through the browser using native language bindings (`hi-IN`, `kn-IN`). 
- **Voice-to-Action Interface:** Completely hands-free operation utilizing the Web Speech API. Users can trigger emergency networks while maintaining physical safety.
- **Cinematic 3D Interface:** A floating digital 3D Agent positioned over a dynamic "antigravity" particle canvas custom-engineered with `Three.js`.
- **Intelligent Response Subsystems:**
  - **🚑 Emergency Agent:** Triangulates GPS and dispatches nearest rescue teams.
  - **👁️ Identity Agent:** Processes facial biometric data and coordinates blood profiles.
  - **💼 Finance Agent:** Auto-validates active insurance structures to ensure zero-delay treatment at the hospital.
  - **🚨 Security Agent:** Initiates missing person trackers across local CCTV grids.
- **Zero-Friction Product Tour:** Seamless built-in interactive overlay guiding judges and first-time users perfectly through the UI capabilities.

## 📁 File Structure

The project has been aggressively optimized for the Phase 3 presentation. The entire multi-agent routing, 3D processing, and NLP architecture is cleanly encapsulated:

```text
Rescue-Net/
│
├── src/
│   ├── App.jsx             # Core Application, 3D Stickman, & NLP Engine
│   ├── index.css           # Cinematic UI, Glassmorphism & Animations
│   └── main.jsx            # React DOM Initialization
│
├── package.json            # Engine Dependencies (Three.js, React Drei)
└── README.md               # Project Documentation
```

## 🌐 Agent Workflows

To view the simulation in action, interact with Rescue-Net via Voice or Text using the following simulated paths:

1. **Medical Emergency:** Say *"There's a crash"* or *"दुर्घटना"*
2. **Identification:** Say *"Unconscious"* or *"ಪ್ರಜ್ಞೆ ತಪ್ಪಿದೆ"*
3. **Financial Priority:** Say *"Check Insurance"* or *"पैसे"*
4. **Security / Missing Person:** Say *"Police"* or *"ಲಾಪತಾ"*

## 🛠️ How To Use (Local Setup)

To experience the Phase 3 Rescue-Net system locally:

```bash
# Install required dependencies
npm install

# Launch the Vite development server
npm run dev
```

The application will run optimally at `localhost:5173/` or your specified local port.

> **Judge / Evaluator Notice:** For the full immersive experience, please permit microphone access when launching to test the multi-language voice-routing capabilities!

## 💻 Technical Stack

- **Core Engineering:** React 18, Vite
- **Web Renderer:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **UI Architecture:** Custom Vanilla CSS featuring Glassmorphism, dynamically computed responsive layouts, and native keyframe animations.
- **Audio Logic:** Web Speech SDK (Recognition & Synthesis)
