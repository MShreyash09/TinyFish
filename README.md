# Autonomous KYC/AML Compliance Agent
**Built on the TinyFish Agentic Web Framework** 🏆

[![Java](https://img.shields.io/badge/Java-Spring%20Boot%203.2-orange.svg)](#)
[![WebFlux](https://img.shields.io/badge/Architecture-Reactive%20%28SSE%29-blue.svg)](#)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue.svg)](#)
[![Status](https://img.shields.io/badge/Status-Hackathon%20Ready-success.svg)](#)

> Transforming a multi-billion dollar manual compliance bottleneck into a 40-second autonomous workflow using Agentic Web Architecture.

## 🚀 The Core Problem: The Compliance Bottleneck

In the financial and cybersecurity sectors, Know Your Customer (KYC) and Anti-Money Laundering (AML) compliance is a massive operational bottleneck. Every time a bank, fintech startup, or enterprise onboards a new corporate client, human compliance officers must manually verify the entity to prevent fraud, terrorism financing, and regulatory fines.

**Why it's broken:**
- **Fragmented Data Silos:** Data is scattered across thousands of disparate, poorly built government websites (e.g., state-level Secretary of State portals, UK Companies House, international watchlists).
- **High-Friction Manual Labor:** Analysts spend hours manually navigating these dynamic sites, bypassing captchas, and cross-referencing names against financial sanction lists (like OFAC).
- **Fragile Tech Status Quo:** Traditional web scrapers break the moment a government website changes its UI. Simple LLM APIs cannot independently click through multi-step search workflows.

## 💡 The Solution: Agentic Web Automation

We are building an autonomous compliance investigator using the **TinyFish Web Agent API**. Instead of relying on brittle scrapers or non-existent APIs, our system utilizes a stealth web agent that navigates the web exactly like a human analyst—handling dynamic rendering, complex UIs, and multi-step transactions—but at machine speed.

### The Autonomous Workflow
1. **Entity Ingestion:** The system receives a target company name via our stealth dashboard.
2. **Dynamic Navigation:** The agent autonomously navigates to corporate registry websites.
3. **Extraction & Discovery:** It interacts with search forms, waits for dynamic tables to render, bypasses basic cookie walls, and extracts the target's Board of Directors.
4. **Sanction Cross-Referencing:** The agent takes the extracted director names, navigates to international financial sanction watchlists (e.g., US Treasury OFAC), inputs the data, and checks for direct hits.
5. **Dossier Compilation:** The backend streams the extracted JSON data and files into a unified, live-updating risk dossier presented on our frontend dashboard.

## 🏗 System Architecture

To ensure the system is robust, scalable, and non-blocking, we decoupled the intelligence from the orchestration:

* **The Brain (TinyFish API):** Handles the localized browser execution, DOM parsing, state management on the specific webpage, and stealth capabilities to avoid enterprise bot-blocking.
* **The Central Nervous System (Java Spring Boot WebFlux):** A robust, reactive backend designed to manage concurrent agent sessions, listen to live Server-Sent Events (SSE) streams, and safely proxy the connection to clients without leaking API keys.
* **The Face (React/TypeScript):** A premium cybersecurity terminal displaying the live stream of the agent's actions and compiling the final risk assessment dynamically.

---

## 💻 Getting Started

### 1. Requirements
* Java 17+
* Node.js v18+
* A TinyFish API Key

### 2. Backend Setup (Java)
1. Add your API Key to `backend/src/main/resources/application.properties`.
```properties
tinyfish.api.key=sk-YOUR-API-KEY-HERE
```
2. Navigate to `backend/` and run the Spring Boot server (Default: `localhost:8080`).

### 3. Frontend Setup (React/TS)
1. Open a new terminal and navigate to `frontend/`.
2. Install dependencies:
```bash
npm install
```
3. Boot the development server:
```bash
npm run dev
```

### 4. Let it Rip
Navigate to `http://localhost:3000`, punch in a target corporate entity (e.g. `Tesla`), hit **Launch Recon**, and watch the live WebFlux SSE stream stream the agent's actions straight onto your terminal screen.

---

**Built with 💻 for the TinyFish HackerEarth Hackathon.**
